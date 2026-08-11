import { useTasksStore } from "../store/tasks-store";

export function useTasks() {
  return {
    tasks: useTasksStore(
      (state) => state.tasks
    ),

    selectedTask: useTasksStore(
      (state) => state.selectedTask
    ),

    setSelectedTask: useTasksStore(
      (state) => state.setSelectedTask
    ),

    addTask: useTasksStore(
      (state) => state.addTask
    ),

    updateTask: useTasksStore(
      (state) => state.updateTask
    ),

    deleteTask: useTasksStore(
      (state) => state.deleteTask
    ),
  };
}