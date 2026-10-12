import { useTasks } from "./useTasks";

export function useKanban(query = "") {
  const { tasks } = useTasks();
  const q = query.trim().toLowerCase();
  const visible = q
    ? tasks.filter((task) =>
        [task.title, task.description, task.assignee, ...task.labels].some((v) =>
          (v ?? "").toLowerCase().includes(q),
        ),
      )
    : tasks;

  return {
    todo: visible.filter((t) => t.status === "todo"),
    progress: visible.filter((t) => t.status === "progress"),
    review: visible.filter((t) => t.status === "review"),
    done: visible.filter((t) => t.status === "done"),
  };
}
