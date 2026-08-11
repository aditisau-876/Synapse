import { Mic } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function VoiceRecorder({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
      flex
      h-11
      w-11
      items-center
      justify-center
      rounded-xl
      text-muted-foreground
      transition-all
      duration-200
      hover:bg-muted
      hover:text-red-500
      "
    >
      <Mic size={20} />
    </button>
  );
}