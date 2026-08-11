import { create } from "zustand";

interface ChatStore {
  selectedConversationId: string;

  setConversation: (
    id: string
  ) => void;
}

export const useChatStore =
  create<ChatStore>((set) => ({
    selectedConversationId: "1",

    setConversation: (id) =>
      set({
        selectedConversationId: id,
      }),
  }));