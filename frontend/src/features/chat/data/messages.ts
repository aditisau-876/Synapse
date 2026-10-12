import type { Message } from "../types/chat";

const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000).toISOString();

const alex = { id: "demo-u2", name: "Alex Johnson", online: true };
const me = { id: "me", name: "You", online: true };

export const messages: Message[] = [
  { id: "m1", conversationId: "demo-1", sender: alex, text: "Morning! Did you see the new designs?", createdAt: minutesAgo(190), status: "read", own: false },
  { id: "m2", conversationId: "demo-1", sender: me, text: "Yes, the onboarding flow looks much clearer.", createdAt: minutesAgo(185), status: "read", own: true },
  { id: "m3", conversationId: "demo-1", sender: alex, text: "Ready for today's meeting?", createdAt: minutesAgo(12), status: "delivered", own: false },
  { id: "m4", conversationId: "demo-1", sender: alex, text: "I can start the call whenever you are.", createdAt: minutesAgo(11), status: "delivered", own: false },
];
