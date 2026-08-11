import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function AddTaskButton({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
      flex
      w-full
      items-center
      justify-center
      gap-2
      rounded-2xl
      border-2
      border-dashed
      border-[var(--synapse-accent-500)]/30
      bg-[var(--synapse-accent-500)]/5
      px-4
      py-4
      text-[var(--synapse-accent-500)]
      transition-all
      duration-300
      hover:border-[var(--synapse-accent-500)]
      hover:bg-[var(--synapse-accent-500)]/10
      hover:text-[var(--synapse-accent-300)]
      "
    >
      <Plus size={18} />

      <span className="font-medium">
        Add Task
      </span>
    </button>
  );
}