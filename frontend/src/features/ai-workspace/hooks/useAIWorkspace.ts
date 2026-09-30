import { useState } from "react";
import type { AIMessage } from "../types";
import { askAI } from "../services";

export function useAIWorkspace() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sendMessage = async (content?: string) => {
    const messageText = (content ?? input).trim();
    if (!messageText || isLoading) return;
    setMessages((current) => [...current, { id: crypto.randomUUID(), role: "user", content: messageText, timestamp: new Date() }]);
    setInput(""); setIsLoading(true);
    try {
      const result = await askAI(messageText);
      setMessages((current) => [...current, { id: result.id, role: "assistant", content: result.content, timestamp: new Date(result.created_at) }]);
    } catch (error) {
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: error instanceof Error ? `AI request failed: ${error.message}` : "AI request failed.", timestamp: new Date() }]);
    } finally { setIsLoading(false); }
  };
  return { messages, input, setInput, isLoading, sendMessage, clearConversation: () => setMessages([]) };
}
