import type { Conversation } from "../../types/chat";
import { useChatStore } from "../../store/chat-store";
import ProfileAvatar from "@/components/layout/UserMenu/ProfileAvatar";
import { listTimestamp } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function ConversationItem({ conversation }: { conversation: Conversation }) {
  const selectedId = useChatStore((s) => s.selectedConversationId);
  const setConversation = useChatStore((s) => s.setConversation);
  const messages = useChatStore((s) => s.messagesByConversation[conversation.id]);
  const muted = useChatStore((s) => s.mutedIds.includes(conversation.id));

  const active = selectedId === conversation.id;
  const last = messages?.[messages.length - 1];
  const preview = last
    ? `${last.own ? "You: " : ""}${last.text}`
    : conversation.lastMessage || "No messages yet";
  const stamp = listTimestamp(last?.createdAt ?? conversation.lastMessageTime);
  const unread = active ? 0 : conversation.unreadCount;

  return (
    <button
      type="button"
      onClick={() => setConversation(conversation.id)}
      aria-current={active ? "true" : undefined}
      className={cn(
        "relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
        active ? "bg-accent" : "hover:bg-muted",
      )}
    >
      {active && (
        <span className="absolute -left-1 top-3 h-8 w-[3px] rounded-r-full bg-[var(--synapse-accent-500)]" />
      )}
      <ProfileAvatar
        name={conversation.name}
        image={conversation.avatar}
        group={conversation.type === "group"}
        online={conversation.type === "direct" ? conversation.participants[0]?.online : undefined}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className={cn("truncate text-[15px]", unread ? "font-bold" : "font-semibold")}>
            {conversation.name}
          </h3>
          <span className={cn("shrink-0 text-xs", unread ? "font-semibold text-brand" : "text-muted-foreground")}>
            {stamp}
          </span>
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p className={cn("truncate text-sm", unread ? "text-foreground" : "text-muted-foreground")}>
            {preview}
          </p>
          {unread > 0 && (
            <span
              aria-label={`${unread} unread`}
              className={cn(
                "flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-[11px] font-bold",
                muted ? "bg-muted-foreground/30 text-foreground" : "bg-spark text-black",
              )}
            >
              {unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
