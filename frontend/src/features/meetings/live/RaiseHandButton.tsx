import { Hand } from "lucide-react";

interface Props {
  raised: boolean;
  onClick: () => void;
}

export default function RaiseHandButton({
  raised,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
      flex
      h-14
      w-14
      items-center
      justify-center
      rounded-2xl
      transition

      ${
        raised
          ? "bg-amber-500 text-white"
          : "bg-white/10 text-white hover:bg-[var(--synapse-accent-500)]"
      }
      `}
    >
      <Hand size={22} />
    </button>
  );
}