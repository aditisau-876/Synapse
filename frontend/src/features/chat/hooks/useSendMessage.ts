import { toast } from "sonner";
import { getPublicKey, sendEncryptedMessage } from "../services/chat-api";
import {
  encryptMessage,
  exportPublicKey,
  importPublicKey,
  loadOrCreateIdentityKeyPair,
} from "../services/e2ee";
import { useChatStore } from "../store/chat-store";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { getErrorMessage } from "@/lib/errors";

/** Encrypts and sends `text` to a conversation. Resolves true on success. */
export function useSendMessage() {
  const user = useAuthStore((s) => s.user);

  return async function send(conversationId: string, text: string): Promise<boolean> {
    const plaintext = text.trim();
    const store = useChatStore.getState();
    const conversation = store.conversations.find((c) => c.id === conversationId);
    if (!plaintext || !user || !conversation) return false;

    const now = new Date().toISOString();
    const own = { id: user.id, name: user.name, online: true };

    // Offline preview: keep the message on this device.
    if (store.source === "demo") {
      store.addMessage(conversationId, {
        id: crypto.randomUUID(), conversationId, sender: own, text: plaintext,
        createdAt: now, status: "sent", own: true,
      });
      return true;
    }

    const recipientId = conversation.participants[0]?.id;
    if (conversation.type !== "direct" || !recipientId) {
      toast.error("Group messages aren't end-to-end encrypted yet. Message people one-to-one for now.");
      return false;
    }

    try {
      const pair = await loadOrCreateIdentityKeyPair();
      let peer: CryptoKey;
      try {
        const { data } = await getPublicKey(recipientId);
        peer = await importPublicKey(data.public_key);
      } catch {
        toast.error(`${conversation.name} hasn't opened Synapse on a device yet, so there's no key to encrypt to. Ask them to sign in once.`);
        return false;
      }
      const encrypted = await encryptMessage(pair.privateKey, peer, plaintext);
      const senderPublicKey = await exportPublicKey(pair.publicKey);
      const { data } = await sendEncryptedMessage({
        conversation_id: conversationId,
        recipient_id: recipientId,
        ...encrypted,
        sender_public_key: senderPublicKey,
      });
      store.addMessage(conversationId, {
        id: data.id, conversationId, sender: own, text: plaintext,
        createdAt: data.created_at, status: "sent", own: true,
      });
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error, "Message not sent. Try again."));
      return false;
    }
  };
}
