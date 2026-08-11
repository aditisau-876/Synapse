import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function FloatingNewTask({
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Create new task"
      className="
        fixed
        bottom-8
        right-8
        z-40
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-gradient-to-r
        from-[var(--synapse-accent-500)]
        to-[var(--synapse-accent-700)]
        text-white
        shadow-xl
        transition
        hover:scale-105
        hover:shadow-2xl
      "
    >
      <Plus size={26} />
    </button>
  );
}