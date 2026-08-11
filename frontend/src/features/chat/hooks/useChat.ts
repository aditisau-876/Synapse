import { conversations } from "../data/conversations";

import { messages } from "../data/messages";

import { useChatStore } from "../store/chat-store";

export function useChat() {
  const {
    selectedConversationId,
    setConversation,
  } = useChatStore();

  const conversation =
    conversations.find(
      (conversation) =>
        conversation.id ===
        selectedConversationId
    );

  const conversationMessages =
    messages.filter(
      (message) =>
        message.conversationId ===
        selectedConversationId
    );

  return {
    conversations,

    conversation,

    messages: conversationMessages,

    setConversation,
  };
}