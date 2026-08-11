import { MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";

import AssigneeAvatar from "./AssigneeAvatar";
import PriorityBadge from "./PriorityBadge";
import DueDateChip from "./DueDateChip";
import Labels from "./Labels";
import ProgressRing from "./ProgressRing";

import type { Task } from "../types";

interface Props {
  task: Task;
  onClick?: () => void;
}

export default function TaskCard({
  task,
  onClick,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className="
        cursor-pointer
        rounded-3xl
        border
        border-border
        bg-background
        p-5
        shadow-sm
        transition
        hover:border-primary/50
        hover:shadow-md
      "
    >
      <div className="mb-4 flex items-start justify-between">
        <PriorityBadge
          priority={task.priority}
        />

        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="
            rounded-lg
            p-1.5
            text-muted-foreground
            transition
            hover:bg-muted
            hover:text-foreground
          "
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      <h3 className="text-lg font-bold text-foreground">
        {task.title}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        {task.description}
      </p>

      <Labels labels={task.labels} />

      <div className="mt-5">
        <ProgressRing
          progress={task.progress}
        />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <DueDateChip
          dueDate={task.dueDate}
        />

        <div className="flex items-center gap-2">
          <AssigneeAvatar
            name={task.assignee}
          />

          <span className="text-sm text-muted-foreground">
            {task.assignee}
          </span>
        </div>
      </div>
    </motion.div>
  );
}