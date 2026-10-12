import {
  ArrowUp,
  Paperclip,
  Sparkles,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export default function AIInput({
  value,
  onChange,
  onSubmit,
  isLoading = false,
}: Props) {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      if (value.trim()) {
        onSubmit();
      }
    }
  };

  return (
    <div className="w-full">
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-border
          bg-card
          shadow-sm
          transition-all
          focus-within:border-primary/40
          focus-within:shadow-md
          focus-within:shadow-primary/10
        "
      >
        <textarea
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={3}
          placeholder="Ask anything about your workspace..."
          className="
            w-full
            resize-none
            bg-transparent
            px-5
            pb-14
            pt-4
            text-sm
            text-foreground
            outline-none
            placeholder:text-muted-foreground
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        />

        {/* Bottom controls */}
        <div
          className="
            absolute
            bottom-3
            left-3
            right-3
            flex
            items-center
            justify-between
          "
        >
          <button
            type="button"
            className="
              flex
              h-9
              items-center
              gap-2
              rounded-xl
              px-3
              text-sm
              text-muted-foreground
              transition
              hover:bg-muted
              hover:text-foreground
            "
          >
            <Paperclip size={17} />

            <span className="hidden sm:inline">
              Attach
            </span>
          </button>

          <div className="flex items-center gap-2">
            <div
              className="
                hidden
                items-center
                gap-1.5
                text-xs
                text-muted-foreground
                sm:flex
              "
            >
              <Sparkles size={13} />
              Synapse AI
            </div>

            <button
              type="button"
              disabled={
                !value.trim() || isLoading
              }
              onClick={onSubmit}
              aria-label="Send message"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[var(--synapse-accent-500)]
                text-white
                shadow-sm
                transition-all
                
                hover:shadow-md
                disabled:cursor-not-allowed
                disabled:opacity-40
                disabled:
              "
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        Press Enter to send · Shift + Enter for a new line
      </p>
    </div>
  );
}