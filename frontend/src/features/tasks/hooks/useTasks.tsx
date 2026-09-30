import { useEffect } from "react";
import { useTasksStore } from "../store/tasks-store";
import { getTasks } from "../services";

export function useTasks() {
  const store = useTasksStore();
  useEffect(() => {
    if (store.loaded) return;
    void getTasks().then((items) => store.setTasks(items)).catch(() => {}).finally(() => store.setLoaded(true));
  }, [store.loaded]);
  return { tasks: store.tasks, selectedTask: store.selectedTask, setSelectedTask: store.setSelectedTask, addTask: store.addTask, updateTask: store.updateTask, deleteTask: store.deleteTask };
}
