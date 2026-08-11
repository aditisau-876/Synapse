import type { Conversation } from "../../types/chat";
import { useChatStore } from "../../store/chat-store";
import ProfileAvatar from "@/components/layout/UserMenu/ProfileAvatar";

interface Props {
  conversation: Conversation;
}

export default function ConversationItem({
  conversation,
}: Props) {
  const {
    selectedConversationId,
    setConversation,
  } = useChatStore();

  const active =
    selectedConversationId === conversation.id;

  return (
    <button
      onClick={() =>
        setConversation(conversation.id)
      }
      className={`
        group
        flex
        w-full
        gap-4
        rounded-2xl
        p-4
        text-left

        border
        border-transparent

        transition-all
        duration-200

        ${
          active
            ? `
              bg-gradient-to-r
              from-[var(--synapse-accent-600)]
to-[var(--synapse-accent-300)]

              text-white

              shadow-lg
              shadow-[var(--synapse-accent-500)]/20

              scale-[1.01]
            `
            : `
              bg-transparent

              hover:border-[var(--synapse-accent-500)]/30
              hover:bg-[var(--synapse-accent-500)]/10
              hover:shadow-sm
              hover:-translate-y-[1px]

              dark:hover:border-[var(--synapse-accent-500)]/10
              dark:hover:bg-white/5
            `
        }
      `}
    >
      <ProfileAvatar
        name={conversation.name}
        online={
          conversation.participants[0]?.online ??
          false
        }
      />

      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-3">
          <h3 className="truncate font-semibold">
            {conversation.name}
          </h3>

          <span
            className={`
              shrink-0
              text-xs

              ${
                active
                  ? "text-white/80"
                  : "text-muted-foreground"
              }
            `}
          >
            {conversation.lastMessageTime}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-3">
          <p
            className={`
              truncate
              text-sm

              ${
                active
                  ? "text-white/80"
                  : "text-muted-foreground"
              }
            `}
          >
            {conversation.lastMessage}
          </p>

          {conversation.unreadCount > 0 && (
            <div
              className="
                ml-3
                flex
                h-6
                min-w-6
                shrink-0
                items-center
                justify-center

                rounded-full

                bg-[var(--synapse-accent-500)]
                px-2

                text-xs
                font-bold
                text-white

                shadow-sm
              "
            >
              {conversation.unreadCount}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}