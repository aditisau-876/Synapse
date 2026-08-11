import { useState } from "react";

import type { AIMessage } from "../types";

export function useAIWorkspace() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content?: string) => {
    const messageText = (content ?? input).trim();

    if (!messageText || isLoading) {
      return;
    }

    const userMessage: AIMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setInput("");
    setIsLoading(true);

    // Temporary frontend response.
    // This will be replaced with the real AI API later.
    await new Promise((resolve) =>
      setTimeout(resolve, 900)
    );

    const assistantMessage: AIMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "I'm ready to help you with your workspace. Once the AI backend is connected, I'll be able to give you real responses, summarize meetings, help with tasks, and work with your workspace context.",
      timestamp: new Date(),
    };

    setMessages((current) => [
      ...current,
      assistantMessage,
    ]);

    setIsLoading(false);
  };

  const clearConversation = () => {
    setMessages([]);
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
    clearConversation,
  };
}