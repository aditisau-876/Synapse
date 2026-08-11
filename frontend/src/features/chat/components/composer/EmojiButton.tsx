import { useState } from "react";
import EmojiPicker, {
  type EmojiClickData,
} from "emoji-picker-react";

import { Smile } from "lucide-react";

interface Props {
  onEmoji: (emoji: string) => void;
}

export default function EmojiButton({
  onEmoji,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setOpen((value) => !value)}
        className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        text-muted-foreground
        transition
        hover:bg-muted
        "
      >
        <Smile size={20} />
      </button>

      {open && (
        <div className="absolute bottom-14 right-0 z-50">

          <EmojiPicker
            onEmojiClick={(
              emoji: EmojiClickData
            ) => {
              onEmoji(emoji.emoji);
              setOpen(false);
            }}
          />

        </div>
      )}

    </div>
  );
}