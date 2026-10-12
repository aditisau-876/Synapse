import { useEffect } from "react";
import { conversations as demoConversations } from "../data/conversations";
import { messages as demoMessages } from "../data/messages";
import { useChatStore } from "../store/chat-store";
import {
  getConversations,
  getEncryptedMessages,
  getPublicKey,
  publishPublicKey,
  type ApiConversation,
} from "../services/chat-api";
import {
  decryptMessage,
  exportPublicKey,
  fingerprintPublicKey,
  importPublicKey,
  loadOrCreateIdentityKeyPair,
} from "../services/e2ee";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { isNetworkError } from "@/lib/errors";
import type { Conversation, Message } from "../types/chat";

const peerKeyCache = new Map<string, CryptoKey>();
const NO_MESSAGES: Message[] = [];

async function peerKey(userId: string) {
  const cached = peerKeyCache.get(userId);
  if (cached) return cached;
  const { data } = await getPublicKey(userId);
  const key = await importPublicKey(data.public_key);
  peerKeyCache.set(userId, key);
  return key;
}

export function toConversation(c: ApiConversation, myId: string | undefined): Conversation {
  const others = (c.members ?? []).filter((m) => m.id !== myId);
  const type = c.type ?? (others.length > 1 ? "group" : "direct");
  const name =
    type === "direct"
      ? others[0]?.name ?? "Conversation"
      : others.slice(0, 2).map((m) => m.name.split(" ")[0]).join(", ") +
        (others.length > 2 ? ` +${others.length - 2}` : "");
  return {
    id: c.id,
    type,
    name: name || "Conversation",
    avatar: others[0]?.avatar ?? undefined,
    participants: others.map((m) => ({
      id: m.id,
      name: m.name,
      avatar: m.avatar ?? undefined,
      online: Boolean(m.online),
      lastSeen: m.last_seen ?? undefined,
    })),
    lastMessage: "",
    lastMessageTime: c.created_at ?? "",
    unreadCount: 0,
  };
}

/**
 * Mount this ONCE (in ChatShell). It loads conversations, publishes this
 * device's public key, and keeps the open thread fresh. Everything else reads
 * from the store through `useChat`.
 */
export function useChatSync() {
  const user = useAuthStore((s) => s.user);
  const selectedId = useChatStore((s) => s.selectedConversationId);
  const source = useChatStore((s) => s.source);

  // 1. Conversations (refresh every 15s).
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    const load = async () => {
      try {
        const { data } = await getConversations();
        if (cancelled) return;
        useChatStore.getState().setConversations(
          (Array.isArray(data) ? data : []).map((c) => toConversation(c, user.id)),
          "server",
        );
      } catch (error) {
        // Only fall back to sample chats when the server is unreachable on first load.
        if (!cancelled && isNetworkError(error) && useChatStore.getState().source === "loading") {
          useChatStore.getState().setConversations(demoConversations, "demo");
        }
      }
    };
    void load();
    const timer = setInterval(load, 15_000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [user]);

  // 2. Publish this device's public key so others can message us.
  useEffect(() => {
    if (!user || source === "demo") return;
    void (async () => {
      try {
        const pair = await loadOrCreateIdentityKeyPair();
        const publicKey = await exportPublicKey(pair.publicKey);
        const fingerprint = await fingerprintPublicKey(publicKey);
        await publishPublicKey({ algorithm: "ECDH-P256", public_key: publicKey, fingerprint });
      } catch {
        /* WebCrypto needs a secure context (https or localhost) */
      }
    })();
  }, [user, source]);

  // 3. Messages for the open conversation (poll every 4s).
  useEffect(() => {
    if (!selectedId || !user) return;
    const store = useChatStore.getState();

    if (source === "demo") {
      if (!store.messagesByConversation[selectedId]) {
        store.setMessages(selectedId, demoMessages.filter((m) => m.conversationId === selectedId));
      }
      return;
    }
    if (source !== "server") return;

    let cancelled = false;
    const sync = async () => {
      try {
        const { data } = await getEncryptedMessages(selectedId);
        if (cancelled || !Array.isArray(data)) return;

        const existing = useChatStore.getState().messagesByConversation[selectedId] ?? [];
        const known = new Set(existing.map((m) => m.id));
        const fresh = data.filter((item) => !known.has(item.id));
        if (fresh.length === 0 && existing.length === data.length) return;

        const pair = await loadOrCreateIdentityKeyPair();
        const conversation = useChatStore
          .getState()
          .conversations.find((c) => c.id === selectedId);
        const decrypted: Message[] = [];

        for (const item of data) {
          const own = item.sender_id === user.id;
          const prior = existing.find((m) => m.id === item.id);
          if (prior) {
            decrypted.push(prior);
            continue;
          }
          const senderName = own
            ? user.name
            : conversation?.participants.find((p) => p.id === item.sender_id)?.name ?? "Participant";
          let text: string;
          try {
            // A message I sent was encrypted to the recipient, so use THEIR key.
            const key = own
              ? item.recipient_id ? await peerKey(item.recipient_id) : null
              : await importPublicKey(item.sender_public_key);
            if (!key) throw new Error("no key");
            text = await decryptMessage(pair.privateKey, key, item.ciphertext, item.nonce);
          } catch {
            text = "This message can't be decrypted on this device.";
          }
          decrypted.push({
            id: item.id,
            conversationId: selectedId,
            sender: { id: item.sender_id, name: senderName, online: true },
            text,
            createdAt: item.created_at,
            status: "sent",
            own,
          });
        }
        if (!cancelled) useChatStore.getState().setMessages(selectedId, decrypted);
      } catch {
        /* keep what we have; try again on the next tick */
      }
    };
    void sync();
    const timer = setInterval(sync, 4_000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [selectedId, user, source]);
}

/** Read-only view of the chat state for components. */
export function useChat() {
  const conversations = useChatStore((s) => s.conversations);
  const source = useChatStore((s) => s.source);
  const selectedConversationId = useChatStore((s) => s.selectedConversationId);
  const setConversation = useChatStore((s) => s.setConversation);
  const byConversation = useChatStore((s) => s.messagesByConversation);

  const conversation = conversations.find((c) => c.id === selectedConversationId);
  const messages = (selectedConversationId && byConversation[selectedConversationId]) || NO_MESSAGES;

  return { conversations, conversation, messages, source, selectedConversationId, setConversation };
}
