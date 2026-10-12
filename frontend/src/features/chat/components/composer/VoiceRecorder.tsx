import { Mic } from "lucide-react";
import { toast } from "sonner";

export default function VoiceRecorder() {
  return (
    <button
      type="button"
      onClick={() => toast.info("Voice messages are coming soon.")}
      aria-label="Record a voice message (coming soon)"
      title="Voice message (coming soon)"
      className="flex size-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <Mic size={19} />
    </button>
  );
}
