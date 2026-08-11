import AIMessage from "./AIMessage";
import type { AIMessage as AIMessageType } from "../types";

interface Props {
  messages: AIMessageType[];
}

export default function AIConversation({ messages }: Props) {
  return (
    <div className="space-y-5">
      {messages.map((message) => (
        <AIMessage
          key={message.id}
          message={message}
        />
      ))}
    </div>
  );
}