import { useState } from "react";
import { toast } from "sonner";
import { useChat } from "../../hooks/useChat";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { getPublicKey, sendEncryptedMessage } from "../../services/chat-api";
import { encryptMessage, exportPublicKey, loadOrCreateIdentityKeyPair } from "../../services/e2ee";
import { useChatStore } from "../../store/chat-store";

import AttachmentMenu from "./AttachmentMenu";
import AttachmentButton from "./AttachmentButton";
import EmojiButton from "./EmojiButton";
import SendButton from "./SendButton";
import VoiceRecorder from "./VoiceRecorder";

export default function MessageComposer() {
  const [message, setMessage] = useState("");


  const [showAttachment, setShowAttachment] = useState(false);
  const { conversation } = useChat();
  const currentUser = useAuthStore((s) => s.user);
  const addMessage = useChatStore((s) => s.addMessage);

  async function sendMessage() {
    const plaintext = message.trim();
    if (!plaintext || !currentUser || !conversation) return;
    if (conversation.type !== "direct" || !conversation.participants[0]?.id) {
      toast.error("E2EE sending currently requires a direct conversation with a registered participant.");
      return;
    }
    const recipientId = conversation.participants[0].id;
    try {
      const pair = await loadOrCreateIdentityKeyPair();
      const peerResponse = await getPublicKey(recipientId);
      const peerKey = await crypto.subtle.importKey("raw", Uint8Array.from(atob(peerResponse.data.public_key), (c) => c.charCodeAt(0)), { name: "ECDH", namedCurve: "P-256" }, true, []);
      const encrypted = await encryptMessage(pair.privateKey, peerKey, plaintext);
      const senderPublicKey = await exportPublicKey(pair.publicKey);
      const { data } = await sendEncryptedMessage({ conversation_id: conversation.id, recipient_id: recipientId, ...encrypted, sender_public_key: senderPublicKey });
      addMessage(conversation.id, { id: data.id, conversationId: conversation.id, sender: { id: currentUser.id, name: currentUser.name, online: true }, text: plaintext, createdAt: data.created_at, status: "sent", own: true });
      setMessage("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to send encrypted message");
    }
  }

  return (
    <div
      className="
        border-t
        border-border/60

        bg-background/80

        p-5

        backdrop-blur-xl
      "
    >
      <div
        className="
          relative

          flex
          items-end
          gap-2

          rounded-3xl

          border
          border-border/70

          bg-muted/30

          p-2.5

          shadow-sm

          backdrop-blur-xl

          transition-all
          duration-200

          focus-within:border-[var(--synapse-accent-500)]
focus-within:bg-background
focus-within:shadow-md
focus-within:shadow-[var(--synapse-accent-500)]/5

          dark:focus-within:border-[var(--synapse-accent-500)]/30
          dark:focus-within:bg-muted/40
        "
      >
        <AttachmentButton
          onClick={() =>
            setShowAttachment(true)
          }
        />

        <AttachmentMenu
          open={showAttachment}
          onClose={() =>
            setShowAttachment(false)
          }
        />

        <textarea
          rows={1}
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey
            ) {
              event.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Type your message..."
          className="
            max-h-40
            min-h-[44px]

            flex-1

            resize-none

            bg-transparent

            px-1
            py-2

            text-sm

            text-foreground

            placeholder:text-muted-foreground

            outline-none
          "
        />

        <EmojiButton
          onEmoji={(emoji) =>
            setMessage(
              (current) =>
                current + emoji
            )
          }
        />

        {message.trim() ? (
          <SendButton
            disabled={!message.trim()}
            onClick={() => void sendMessage()}
          />
        ) : (
          <VoiceRecorder
            onClick={() =>
              console.log("Voice Recorder")
            }
          />
        )}
      </div>
    </div>
  );
}