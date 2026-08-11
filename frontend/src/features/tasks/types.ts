export type TaskPriority =
  | "Low"
  | "Medium"
  | "High";

export type TaskStatus =
  | "todo"
  | "progress"
  | "review"
  | "done";

export interface Task {

  id: string;

  title: string;

  description: string;

  priority: TaskPriority;

  status: TaskStatus;

  assignee: string;

  dueDate: string;

  progress: number;

  labels: string[];

}