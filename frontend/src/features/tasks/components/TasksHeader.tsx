import { Plus, CheckSquare } from "lucide-react";

interface Props {
  onNewTask: () => void;
}

export default function TasksHeader({
  onNewTask,
}: Props) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <CheckSquare size={22} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Tasks
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Organize your work and keep everything moving.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onNewTask}
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-[var(--synapse-accent-500)]
          to-[var(--synapse-accent-700)]
          px-5
          py-3
          text-sm
          font-semibold
          text-white
          shadow-lg
          transition
          hover:scale-[1.02]
          hover:shadow-xl
        "
      >
        <Plus size={18} />

        New Task
      </button>
    </div>
  );
}