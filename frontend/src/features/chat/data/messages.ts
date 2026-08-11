import type { Message } from "../types/chat";

const alex = {
  id: "2",
  name: "Alex Johnson",
  online: true,
};

const me = {
  id: "1",
  name: "Aditi Sau",
  online: true,
};

export const messages: Message[] = [
  {
    id: "1",

    conversationId: "1",

    sender: alex,

    text: "Hey 👋",

    createdAt: "09:10",

    status: "read",

    own: false,
  },

  {
    id: "2",

    conversationId: "1",

    sender: me,

    text: "Hello Alex!",

    createdAt: "09:11",

    status: "read",

    own: true,
  },

  {
    id: "3",

    conversationId: "1",

    sender: alex,

    text: "Ready for today's meeting?",

    createdAt: "09:12",

    status: "delivered",

    own: false,
  },
];