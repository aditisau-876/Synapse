import type { Task } from "../types";

import TaskCard from "./TaskCard";
import EmptyColumn from "./EmptyColumn";
import AddTaskButton from "./AddTaskButton";

interface Props {
  title: string;
  tasks: Task[];
}

export default function KanbanColumn({
  title,
  tasks,
}: Props) {
  return (
    <div
      className="
        flex
        min-h-[650px]
        flex-col
        rounded-3xl
        border
        border-border
        bg-card
        p-5
        shadow-sm
      "
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">
          {title}
        </h2>

        <span
          className="
            rounded-full
            bg-primary/10
            px-3
            py-1
            text-sm
            font-semibold
            text-primary
          "
        >
          {tasks.length}
        </span>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <EmptyColumn title={title} />
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))
        )}

        <AddTaskButton
          onClick={() => console.log("New Task")}
        />
      </div>
    </div>
  );
}