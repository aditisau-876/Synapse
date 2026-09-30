import { useEffect, useState } from "react";
import { conversations as fallbackConversations } from "../data/conversations";
import { messages as fallbackMessages } from "../data/messages";
import { useChatStore } from "../store/chat-store";
import { getConversations, getEncryptedMessages, publishPublicKey } from "../services/chat-api";
import { decryptMessage, exportPublicKey, fingerprintPublicKey, loadOrCreateIdentityKeyPair } from "../services/e2ee";
import { useAuthStore } from "@/features/auth/store/auth-store";
import type { Conversation, Message } from "../types/chat";

export function useChat() {
  const selectedConversationId = useChatStore((s) => s.selectedConversationId);
  const setConversation = useChatStore((s) => s.setConversation);
  const messagesByConversation = useChatStore((s) => s.messagesByConversation);
  const setMessages = useChatStore((s) => s.setMessages);
  const user = useAuthStore((s) => s.user);
  const [remoteConversations, setRemoteConversations] = useState<Conversation[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await getConversations();
        if (!cancelled && Array.isArray(data) && data.length) {
          setRemoteConversations(data.map((c: { id: string; type?: "direct" | "group"; name?: string; members?: Array<{ id: string; name: string; online?: boolean }> }) => ({ id: c.id, type: c.type ?? "direct", name: c.name ?? "Conversation", participants: (c.members ?? []).map((m) => ({ ...m, online: Boolean(m.online) })), lastMessage: "Encrypted conversation", lastMessageTime: "", unreadCount: 0 })));
        }
      } catch { /* keep local demo data until backend conversations exist */ }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const pair = await loadOrCreateIdentityKeyPair();
        const publicKey = await exportPublicKey(pair.publicKey);
        const fingerprint = await fingerprintPublicKey(publicKey);
        await publishPublicKey({ algorithm: "ECDH-P256", public_key: publicKey, fingerprint });
      } catch { /* crypto may be unavailable in insecure local contexts */ }
    })();
  }, [user?.id]);

  useEffect(() => {
    if (!selectedConversationId || !user) return;
    let cancelled = false;
    (async () => {
      try {
        const { data } = await getEncryptedMessages(selectedConversationId);
        if (!Array.isArray(data)) return;
        const pair = await loadOrCreateIdentityKeyPair();
        const decrypted: Message[] = [];
        for (const item of data) {
          try {
            const senderKey = await cryptoKeyFromPublic(item.sender_public_key);
            const text = await decryptMessage(pair.privateKey, senderKey, item.ciphertext, item.nonce);
            decrypted.push({ id: item.id, conversationId: selectedConversationId, sender: { id: item.sender_id, name: item.sender_id === user.id ? user.name : "Participant", online: true }, text, createdAt: item.created_at, status: "sent", own: item.sender_id === user.id });
          } catch {
            decrypted.push({ id: item.id, conversationId: selectedConversationId, sender: { id: item.sender_id, name: "Encrypted message", online: false }, text: "Unable to decrypt this message on this device.", createdAt: item.created_at, status: "sent", own: item.sender_id === user.id });
          }
        }
        if (!cancelled) setMessages(selectedConversationId, decrypted);
      } catch { /* fallback stays available */ }
    })();
    return () => { cancelled = true; };
  }, [selectedConversationId, user?.id, setMessages]);

  const conversations = remoteConversations ?? fallbackConversations;
  const conversation = conversations.find((c) => c.id === selectedConversationId);
  const local = messagesByConversation[selectedConversationId];
  return { conversations, conversation, messages: local ?? fallbackMessages.filter((m) => m.conversationId === selectedConversationId), setConversation };
}

async function cryptoKeyFromPublic(value: string) {
  return crypto.subtle.importKey("raw", Uint8Array.from(atob(value), (c) => c.charCodeAt(0)), { name: "ECDH", namedCurve: "P-256" }, true, []);
}
