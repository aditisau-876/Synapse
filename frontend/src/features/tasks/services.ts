import { api } from "@/services/api";
import type { Task } from "./types";

export async function getTasks() { const { data } = await api.get<Task[]>("/tasks"); return data; }
export async function createTask(task: Omit<Task, "id">) { const { data } = await api.post<Task>("/tasks", { ...task, due_date: task.dueDate }); return data; }
export async function updateTask(id: string, task: Partial<Task>) { const { data } = await api.patch<Task>(`/tasks/${id}`, { ...task, due_date: task.dueDate }); return data; }
export async function deleteTaskApi(id: string) { await api.delete(`/tasks/${id}`); }
