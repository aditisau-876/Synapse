import { useEffect, useRef, useState } from "react";
import { Lock } from "lucide-react";

import AttachmentButton from "./AttachmentButton";
import EmojiButton from "./EmojiButton";
import SendButton from "./SendButton";
import VoiceRecorder from "./VoiceRecorder";
import { useChat } from "../../hooks/useChat";
import { useSendMessage } from "../../hooks/useSendMessage";
import { useUserSettings } from "@/features/settings/hooks/useUserSettings";

/** Also used inside the meeting room chat panel. */
export default function MessageComposer() {
  const { conversation, source } = useChat();
  const send = useSendMessage();
  const { settings } = useUserSettings();
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const box = useRef<HTMLTextAreaElement>(null);

  // Drafts are per open conversation.
  useEffect(() => {
    setText("");
  }, [conversation?.id]);

  // Grow with the text, up to ~6 lines.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 144)}px`;
  }, [text]);

  if (!conversation) return null;

  const groupBlocked = conversation.type === "group" && source === "server";

  const submit = async () => {
    const value = text.trim();
    if (!value || sending) return;
    setSending(true);
    setText("");
    const ok = await send(conversation.id, value);
    if (!ok) setText(value); // give the draft back so nothing is lost
    setSending(false);
    box.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter") return;
    const withModifier = e.metaKey || e.ctrlKey;
    if (settings.enterToSend ? !e.shiftKey : withModifier) {
      e.preventDefault();
      void submit();
    }
  };

  if (groupBlocked) {
    return (
      <div className="flex shrink-0 items-center justify-center gap-2 border-t border-border bg-card px-4 py-4 text-sm text-muted-foreground">
        <Lock size={15} />
        Group chats aren't end-to-end encrypted yet, so sending is limited to one-to-one chats.
      </div>
    );
  }

  return (
    <div className="pb-safe shrink-0 border-t border-border bg-card px-2 py-2 sm:px-4">
      <div className="mx-auto flex max-w-3xl items-end gap-1">
        <AttachmentButton />
        <div className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 focus-within:border-[color:var(--synapse-accent-500)] focus-within:ring-2 focus-within:ring-[color:var(--synapse-accent-500)]/25">
          <textarea
            ref={box}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Write a message"
            aria-label="Message"
            className="block max-h-36 min-h-10 w-full resize-none bg-transparent py-2.5 text-[15px] leading-5 outline-none placeholder:text-muted-foreground"
          />
        </div>
        <EmojiButton onEmoji={(emoji) => setText((t) => t + emoji)} />
        {text.trim() ? <SendButton disabled={sending} onClick={() => void submit()} /> : <VoiceRecorder />}
      </div>
    </div>
  );
}
