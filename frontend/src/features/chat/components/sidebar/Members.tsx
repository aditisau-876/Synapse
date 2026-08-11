import { Users } from "lucide-react";
import ProfileAvatar from "@/components/layout/UserMenu/ProfileAvatar";
import { useChat } from "../../hooks/useChat";
  import EmptyState from "@/components/common/EmptyState";
export default function Members() {
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

  return (
    <div className="border-b border-border p-6">

      <h3 className="mb-4 font-semibold">
        Members
      </h3>

      <div className="space-y-3">

        {conversation.participants.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-3"
          >
            <ProfileAvatar
              name={member.name}
              image={member.avatar}
              online={member.online}
            />

            <div>

              <p className="font-medium">
                {member.name}
              </p>

              <p className="text-xs text-muted-foreground">
                {member.online
                  ? "Online"
                  : member.lastSeen}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}