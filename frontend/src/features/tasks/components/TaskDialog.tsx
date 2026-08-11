import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function TaskDialog({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          text-slate-900
          shadow-2xl

          dark:border-slate-700
          dark:bg-slate-900
          dark:text-white
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Create Task
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Add a task to your workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              rounded-xl
              p-2
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900

              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <div className="mt-6 space-y-5">

          {/* Title */}
          <div>
            <label
              htmlFor="task-title"
              className="
                mb-2
                block
                text-sm
                font-medium
              "
            >
              Task title
            </label>

            <input
              id="task-title"
              type="text"
              placeholder="What needs to be done?"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-slate-900
                outline-none
                transition-all

                placeholder:text-slate-400

                focus:border-[var(--synapse-accent-500)]
                focus:ring-4
                focus:ring-[var(--synapse-accent-500)]/10

                dark:border-slate-700
                dark:bg-slate-950
                dark:text-white
                dark:placeholder:text-slate-500

                dark:focus:border-[var(--synapse-accent-500)]
              "
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="task-description"
              className="
                mb-2
                block
                text-sm
                font-medium
              "
            >
              Description
            </label>

            <textarea
              id="task-description"
              placeholder="Add a description..."
              rows={4}
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-slate-900
                outline-none
                transition-all

                placeholder:text-slate-400

                focus:border-[var(--synapse-accent-500)]
                focus:ring-4
                focus:ring-[var(--synapse-accent-500)]/10

                dark:border-slate-700
                dark:bg-slate-950
                dark:text-white
                dark:placeholder:text-slate-500

                dark:focus:border-[var(--synapse-accent-500)]
              "
            />
          </div>

          {/* Create */}
          <button
            type="button"
            className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-[var(--synapse-accent-500)]
              to-[var(--synapse-accent-700)]
              px-4
              py-3
              font-semibold
              text-white
              shadow-lg
              transition-all
              hover:-translate-y-0.5
              hover:opacity-90
              hover:shadow-xl
              active:translate-y-0
            "
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}