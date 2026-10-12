import { create } from "zustand";
import type { Conversation, Message } from "../types/chat";

export type ChatSource = "loading" | "server" | "demo";

interface ChatStore {
  conversations: Conversation[];
  source: ChatSource;
  /** null = nothing open (mobile shows the list). */
  selectedConversationId: string | null;
  messagesByConversation: Record<string, Message[]>;
  mutedIds: string[];
  setConversations: (conversations: Conversation[], source: ChatSource) => void;
  setConversation: (id: string | null) => void;
  setMessages: (conversationId: string, messages: Message[]) => void;
  addMessage: (conversationId: string, message: Message) => void;
  toggleMute: (id: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  conversations: [],
  source: "loading",
  selectedConversationId: null,
  messagesByConversation: {},
  mutedIds: [],
  setConversations: (conversations, source) => set({ conversations, source }),
  setConversation: (id) => set({ selectedConversationId: id }),
  setMessages: (conversationId, messages) =>
    set((state) => ({
      messagesByConversation: { ...state.messagesByConversation, [conversationId]: messages },
    })),
  addMessage: (conversationId, message) =>
    set((state) => ({
      messagesByConversation: {
        ...state.messagesByConversation,
        [conversationId]: [...(state.messagesByConversation[conversationId] ?? []), message],
      },
    })),
  toggleMute: (id) =>
    set((state) => ({
      mutedIds: state.mutedIds.includes(id)
        ? state.mutedIds.filter((x) => x !== id)
        : [...state.mutedIds, id],
    })),
}));
