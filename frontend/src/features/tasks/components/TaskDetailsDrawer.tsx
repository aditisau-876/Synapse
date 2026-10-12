import { X } from "lucide-react";

import Checklist from "./Checklist";
import CommentsPanel from "./CommentsPanel";
import AttachmentsPanel from "./AttachmentsPanel";
import TaskActivity from "./TaskActivity";
import { useTasksStore } from "../store/tasks-store";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function TaskDetailsDrawer({
  open,
  onClose,
}: Props) {
  const task = useTasksStore((s) => s.selectedTask);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose}>
      <div className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-border bg-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Task details
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Review and manage this task.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              p-2
              text-muted-foreground
              transition
              hover:bg-muted
              hover:text-foreground
            "
          >
            <X size={19} />
          </button>
        </div>

        <div className="space-y-6 p-5">
          {task && (
            <div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              {task.description && (
                <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>
              )}
              <p className="mt-2 text-xs text-muted-foreground">
                {task.priority} priority{task.dueDate ? ` · Due ${task.dueDate}` : ""}
                {task.assignee ? ` · ${task.assignee}` : ""}
              </p>
            </div>
          )}
          <Checklist />

          <CommentsPanel />

          <AttachmentsPanel />

          <TaskActivity />
        </div>
      </div>
    </div>
  );
}