import type { Meeting } from "../types/meeting";

export const meetings: Meeting[] = [

  {
    id: "1",
    title: "Design Sprint",
    host: "Alex Johnson",
    date: "Today",
    time: "3:00 PM",
    participants: 12,
    status: "live",
  },

  {
    id: "2",
    title: "Frontend Planning",
    host: "Sarah Parker",
    date: "Tomorrow",
    time: "10:00 AM",
    participants: 8,
    status: "upcoming",
  },

  {
    id: "3",
    title: "Weekly Standup",
    host: "Emily",
    date: "Yesterday",
    time: "9:00 AM",
    participants: 16,
    status: "completed",
  },

];