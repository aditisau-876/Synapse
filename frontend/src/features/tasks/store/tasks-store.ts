import { create } from "zustand";
import { tasks } from "../constants";
import type { Task } from "../types";

interface TaskStore {
  tasks: Task[];
  selectedTask?: Task;

  setSelectedTask: (task?: Task) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

export const useTasksStore = create<TaskStore>((set) => ({
  tasks,
  selectedTask: undefined,

  setSelectedTask: (task) =>
    set({
      selectedTask: task,
    }),

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === task.id ? task : t
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter(
        (t) => t.id !== id
      ),
    })),
}));