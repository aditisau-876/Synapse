import { useState } from "react";

import TasksHeader from "../components/TasksHeader";
import SearchTasks from "../components/SearchTasks";
import TaskFilterBar from "../components/TaskFilterBar";
import KanbanBoard from "../components/KanbanBoard";
import FloatingNewTask from "../components/FloatingNewTask";
import TaskDialog from "../components/TaskDialog";
import TaskDetailsDrawer from "../components/TaskDetailsDrawer";
import { useTasksStore } from "../store/tasks-store";

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const selectedTask = useTasksStore((s) => s.selectedTask);
  const setSelectedTask = useTasksStore((s) => s.setSelectedTask);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1700px] space-y-6">
        <TasksHeader onNewTask={() => setDialogOpen(true)} />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <SearchTasks value={search} onChange={setSearch} />
          <TaskFilterBar />
        </div>

        <KanbanBoard search={search} />
      </div>

      <FloatingNewTask onClick={() => setDialogOpen(true)} />

      <TaskDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />

      <TaskDetailsDrawer
        open={Boolean(selectedTask)}
        onClose={() => setSelectedTask(undefined)}
      />
    </div>
  );
}
