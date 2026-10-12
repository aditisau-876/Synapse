import { SquarePen } from "lucide-react";

export default function ConversationHeader({ onNewChat }: { onNewChat: () => void }) {
  return (
    <div className="flex h-14 shrink-0 items-center justify-between px-4">
      <h1 className="text-xl font-bold">Chats</h1>
      <button
        type="button"
        onClick={onNewChat}
        aria-label="New chat"
        title="New chat"
        className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <SquarePen size={19} />
      </button>
    </div>
  );
}
