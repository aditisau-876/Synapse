import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Smile } from "lucide-react";
import { useTheme } from "next-themes";
import { Theme } from "emoji-picker-react";

// The picker is large; only download it when someone opens it.
const EmojiPicker = lazy(() => import("emoji-picker-react"));

interface Props {
  onEmoji: (emoji: string) => void;
}

export default function EmojiButton({ onEmoji }: Props) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapper} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Insert emoji"
        aria-expanded={open}
        className="flex size-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Smile size={19} />
      </button>
      {open && (
        <div className="animate-pop absolute bottom-12 right-0 z-50">
          <Suspense
            fallback={<div className="h-[380px] w-[320px] rounded-xl border border-border bg-popover" />}
          >
            <EmojiPicker
              theme={resolvedTheme === "dark" ? "dark" : "light"}
              width={320}
              height={380}
              lazyLoadEmojis
              onEmojiClick={(emoji: { emoji: string }) => onEmoji(emoji.emoji)}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}
