import type { Conversation } from "../types/chat";

/** Sample chats, used only when the API can't be reached (offline UI preview). */
export const conversations: Conversation[] = [
  {
    id: "demo-1",
    type: "direct",
    name: "Alex Johnson",
    participants: [{ id: "demo-u2", name: "Alex Johnson", online: true }],
    lastMessage: "Ready for today's meeting?",
    lastMessageTime: new Date().toISOString(),
    unreadCount: 2,
  },
  {
    id: "demo-2",
    type: "direct",
    name: "Sarah Parker",
    participants: [{ id: "demo-u3", name: "Sarah Parker", online: false, lastSeen: "2h ago" }],
    lastMessage: "The design is ready.",
    lastMessageTime: new Date(Date.now() - 86_400_000).toISOString(),
    unreadCount: 0,
  },
  {
    id: "demo-3",
    type: "group",
    name: "Frontend Team",
    participants: [
      { id: "demo-u2", name: "Alex Johnson", online: true },
      { id: "demo-u3", name: "Sarah Parker", online: false },
      { id: "demo-u4", name: "Emily Chen", online: true },
    ],
    lastMessage: "Standup moved to 4 PM.",
    lastMessageTime: new Date(Date.now() - 3 * 86_400_000).toISOString(),
    unreadCount: 5,
  },
];
