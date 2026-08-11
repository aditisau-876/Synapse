import ProfileAvatar from "@/components/layout/UserMenu/ProfileAvatar";
import { useChat } from "../../hooks/useChat";
import { Users } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
export default function ChatInfo() {
  const { conversation } = useChat();

if (!conversation) {
  return (
    <EmptyState
      icon={Users}
      title="No Members"
      description="Open a conversation to view its members."
    />
  );
}

  const online =
    conversation.participants[0]?.online ?? false;

  return (
    <div className="border-b border-border p-6">

      <div className="flex flex-col items-center">

        <ProfileAvatar
          name={conversation.name}
          image={conversation.avatar}
          online={online}
        />

        <h2 className="mt-4 text-xl font-bold">
          {conversation.name}
        </h2>

        <p className="text-sm text-muted-foreground">
          {online
            ? "Online"
            : conversation.participants[0]?.lastSeen ??
              "Offline"}
        </p>

      </div>

    </div>
  );
}