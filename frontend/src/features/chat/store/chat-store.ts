import { create } from "zustand";
import type { Message } from "../types/chat";

interface ChatStore {
  selectedConversationId: string;
  messagesByConversation: Record<string, Message[]>;
  setConversation: (id: string) => void;
  setMessages: (conversationId: string, messages: Message[]) => void;
  addMessage: (conversationId: string, message: Message) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedConversationId: "1",
  messagesByConversation: {},
  setConversation: (id) => set({ selectedConversationId: id }),
  setMessages: (conversationId, messages) => set((state) => ({ messagesByConversation: { ...state.messagesByConversation, [conversationId]: messages } })),
  addMessage: (conversationId, message) => set((state) => ({ messagesByConversation: { ...state.messagesByConversation, [conversationId]: [...(state.messagesByConversation[conversationId] ?? []), message] } })),
}));
