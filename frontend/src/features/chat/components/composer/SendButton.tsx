import { SendHorizontal } from "lucide-react";

interface Props {
  disabled: boolean;
  onClick: () => void;
}

export default function SendButton({ disabled, onClick }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label="Send message"
      className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--synapse-accent-500)] text-white transition-colors hover:bg-[var(--synapse-accent-600)] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <SendHorizontal size={18} />
    </button>
  );
}
