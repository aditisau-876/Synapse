import type { Task } from "./types";

export const tasks: Task[] = [
  {
    id: "1",
    title: "Finalize chat reactions",
    description: "Add message reactions and interaction states.",
    priority: "High",
    status: "todo",
    assignee: "Aditi",
    dueDate: "Tomorrow",
    progress: 10,
    labels: ["Chat", "Frontend"],
  },

  {
    id: "2",
    title: "Improve meeting controls",
    description: "Refine microphone, camera, participant, and screen-share controls.",
    priority: "High",
    status: "progress",
    assignee: "Alex",
    dueDate: "Today",
    progress: 65,
    labels: ["Meetings", "UI"],
  },

  {
    id: "3",
    title: "Review task assignment flow",
    description: "Test assigning tasks to team members and updating their status.",
    priority: "Medium",
    status: "review",
    assignee: "Sarah",
    dueDate: "Friday",
    progress: 90,
    labels: ["Tasks", "Testing"],
  },

  {
    id: "4",
    title: "Complete collaborative whiteboard",
    description: "Finalize drawing tools and meeting whiteboard interactions.",
    priority: "High",
    status: "done",
    assignee: "Emily",
    dueDate: "Yesterday",
    progress: 100,
    labels: ["Whiteboard", "Collaboration"],
  },
];