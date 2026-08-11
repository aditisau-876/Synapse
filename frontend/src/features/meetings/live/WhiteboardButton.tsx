import { PenSquare } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function WhiteboardButton({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
      flex
      h-14
      w-14
      items-center
      justify-center
      rounded-2xl
      bg-white/10
      text-white
      transition
      hover:bg-[var(--synapse-accent-500)]
      "
    >
      <PenSquare size={22} />
    </button>
  );
}