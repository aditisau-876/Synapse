import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTasks } from "../hooks/useTasks";
import { createTask } from "../services";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function TaskDialog({
  open,
  onClose,
}: Props) {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
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
          border-border
          bg-card
          p-6
          text-foreground
          shadow-2xl

          dark:border-border
          dark:bg-card
          dark:text-foreground
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Create Task
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
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
              hover:bg-muted
              hover:text-foreground

              dark:text-muted-foreground
              dark:hover:bg-muted
              dark:hover:text-foreground
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="
                w-full
                rounded-xl
                border
                border-border
                bg-card
                px-4
                py-3
                text-foreground
                outline-none
                transition-all

                placeholder:text-muted-foreground

                focus:border-[color:var(--synapse-accent-500)]
                focus:ring-4
                focus:ring-[color:var(--synapse-accent-500)]/10

                dark:border-border
                dark:bg-background
                dark:text-foreground
                dark:placeholder:text-muted-foreground

                dark:focus:border-[color:var(--synapse-accent-500)]
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              rows={4}
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-border
                bg-card
                px-4
                py-3
                text-foreground
                outline-none
                transition-all

                placeholder:text-muted-foreground

                focus:border-[color:var(--synapse-accent-500)]
                focus:ring-4
                focus:ring-[color:var(--synapse-accent-500)]/10

                dark:border-border
                dark:bg-background
                dark:text-foreground
                dark:placeholder:text-muted-foreground

                dark:focus:border-[color:var(--synapse-accent-500)]
              "
            />
          </div>

          {/* Create */}
          <button
            type="button"
            disabled={saving || !title.trim()}
            onClick={async () => {
              setSaving(true);
              try {
                const task = await createTask({ title: title.trim(), description, priority: "Medium", status: "todo", assignee: "", dueDate: "", progress: 0, labels: [] });
                addTask(task); setTitle(""); setDescription(""); onClose(); toast.success("Task created");
              } catch (error) { toast.error(error instanceof Error ? error.message : "Unable to create task"); }
              finally { setSaving(false); }
            }}
            className="
              w-full
              rounded-xl
              bg-[var(--synapse-accent-500)]
              px-4
              py-3
              font-semibold
              text-white
              shadow-lg
              transition-all
              
              hover:opacity-90
              hover:shadow-xl
              
            "
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}