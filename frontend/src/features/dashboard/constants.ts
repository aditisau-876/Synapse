import type {ActivityItem, FileItem, Meeting, RecentChat, TaskItem, TeamMember} from "./types";

export const recentChats: RecentChat[] = [
  {
    id: "1",
    name: "Alex",
    message: "Let's review the UI today.",
    time: "2 min ago",
    online: true,
    unread: 2,
  },
  {
    id: "2",
    name: "Sarah",
    message: "Meeting starts at 3 PM.",
    time: "10 min ago",
    online: true,
    unread: 0,
  },
  {
    id: "3",
    name: "Emily",
    message: "Uploaded new designs.",
    time: "Yesterday",
    online: false,
    unread: 0,
  },
];

export const meetings: Meeting[] = [
  {
    id: "1",
    title: "UI Review",
    time: "10:30 AM",
    participants: 5,
  },
  {
    id: "2",
    title: "Sprint Planning",
    time: "3:00 PM",
    participants: 8,
  },
];

export const files: FileItem[] = [
  {
    id: "1",
    name: "Dashboard.fig",
    type: "Figma",
    size: "4.5 MB",
  },
  {
    id: "2",
    name: "Meeting Notes.pdf",
    type: "PDF",
    size: "1.2 MB",
  },
  {
    id: "3",
    name: "Logo.png",
    type: "Image",
    size: "580 KB",
  },
];

export const tasks: TaskItem[] = [
  {
    id: "1",
    title: "Authentication",
    progress: 90,
    priority: "High",
  },
  {
    id: "2",
    title: "Dashboard",
    progress: 60,
    priority: "Medium",
  },
  {
    id: "3",
    title: "Whiteboard",
    progress: 40,
    priority: "High",
  },
];

export const activities: ActivityItem[] = [
  {
    id: "1",
    title: "Alex uploaded Dashboard.fig",
    description: "New dashboard mockup.",
    time: "5 mins ago",
  },
  {
    id: "2",
    title: "Sarah completed Login",
    description: "Authentication finished.",
    time: "30 mins ago",
  },
  {
    id: "3",
    title: "Emily started a Meeting",
    description: "Design discussion.",
    time: "1 hour ago",
  },
];

export const team: TeamMember[] = [
  {
    id: "1",
    name: "Aditi",
    avatar: "",
    online: true,
  },
  {
    id: "2",
    name: "Alex",
    avatar: "",
    online: true,
  },
  {
    id: "3",
    name: "Sarah",
    avatar: "",
    online: true,
  },
  {
    id: "4",
    name: "Emily",
    avatar: "",
    online: false,
  },
];