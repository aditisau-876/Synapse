import type { Conversation } from "../types/chat";

export const conversations: Conversation[] = [
  {
    id: "1",

    type: "direct",

    name: "Alex Johnson",

    avatar: "",

    participants: [
      {
        id: "2",
        name: "Alex Johnson",
        online: true,
      },
    ],

    lastMessage: "See you tomorrow 👋",

    lastMessageTime: "09:15",

    unreadCount: 3,
  },

  {
    id: "2",

    type: "direct",

    name: "Sarah Parker",

    participants: [
      {
        id: "3",
        name: "Sarah Parker",
        online: false,
        lastSeen: "2h ago",
      },
    ],

    lastMessage: "The design is ready.",

    lastMessageTime: "Yesterday",

    unreadCount: 0,
  },

  {
    id: "3",

    type: "group",

    name: "Frontend Team",

    participants: [],

    lastMessage: "Meeting starts at 4 PM.",

    lastMessageTime: "Mon",

    unreadCount: 8,
  },
];