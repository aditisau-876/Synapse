import { useState } from "react";

import TasksHeader from "../components/TasksHeader";
import SearchTasks from "../components/SearchTasks";
import TaskFilterBar from "../components/TaskFilterBar";
import KanbanBoard from "../components/KanbanBoard";
import FloatingNewTask from "../components/FloatingNewTask";
import TaskDialog from "../components/TaskDialog";
import TaskDetailsDrawer from "../components/TaskDetailsDrawer";

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="mx-auto max-w-[1700px] space-y-8">
        <TasksHeader
          onNewTask={() => setDialogOpen(true)}
        />

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <SearchTasks
            value={search}
            onChange={setSearch}
          />

          <TaskFilterBar />
        </div>

        <KanbanBoard />
      </div>

      <FloatingNewTask
        onClick={() => setDialogOpen(true)}
      />

      <TaskDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />

      <TaskDetailsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}