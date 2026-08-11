import { X } from "lucide-react";

import Checklist from "./Checklist";
import CommentsPanel from "./CommentsPanel";
import AttachmentsPanel from "./AttachmentsPanel";
import TaskActivity from "./TaskActivity";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function TaskDetailsDrawer({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full max-w-xl border-l border-border bg-card shadow-2xl">
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

        <div className="space-y-6 overflow-y-auto p-5">
          <Checklist />

          <CommentsPanel />

          <AttachmentsPanel />

          <TaskActivity />
        </div>
      </div>
    </div>
  );
}