import { Paperclip } from "lucide-react";
import { toast } from "sonner";

/** Files aren't supported by the encrypted-message API yet; say so instead of faking it. */
export default function AttachmentButton() {
  return (
    <button
      type="button"
      onClick={() => toast.info("Sending files is coming soon.")}
      aria-label="Attach a file (coming soon)"
      title="Attach a file (coming soon)"
      className="flex size-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <Paperclip size={19} />
    </button>
  );
}
