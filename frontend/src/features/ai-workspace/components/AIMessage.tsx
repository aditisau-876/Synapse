import { Bot, User } from "lucide-react";
import type { AIMessage as AIMessageType } from "../types";

interface Props {
  message: AIMessageType;
}

export default function AIMessage({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Bot size={18} />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "border border-border bg-card text-foreground"
        }`}
      >
        {message.content}
      </div>

      {isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <User size={18} />
        </div>
      )}
    </div>
  );
}