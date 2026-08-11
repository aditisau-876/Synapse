import { useRef, useState } from "react";

import AttachmentMenu from "./AttachmentMenu";
import AttachmentButton from "./AttachmentButton";
import EmojiButton from "./EmojiButton";
import SendButton from "./SendButton";
import VoiceRecorder from "./VoiceRecorder";

export default function MessageComposer() {
  const [message, setMessage] = useState("");

  const fileInput = useRef<HTMLInputElement | null>(null);

  const [showAttachment, setShowAttachment] =
    useState(false);

  function sendMessage() {
    if (!message.trim()) return;

    console.log(message);

    setMessage("");
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
            onClick={sendMessage}
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