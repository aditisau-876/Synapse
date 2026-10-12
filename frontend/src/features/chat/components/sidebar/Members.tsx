import ProfileAvatar from "@/components/layout/UserMenu/ProfileAvatar";
import { useChat } from "../../hooks/useChat";

export default function Members() {
  const { conversation } = useChat();
  if (!conversation || conversation.type !== "group") return null;

  return (
    <div className="border-b border-border px-5 py-4">
      <h3 className="mb-3 text-sm font-semibold">
        {conversation.participants.length + 1} members
      </h3>
      <ul className="space-y-1">
        {conversation.participants.map((m) => (
          <li key={m.id} className="flex items-center gap-3 rounded-lg py-1.5">
            <ProfileAvatar name={m.name} image={m.avatar} online={m.online} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{m.name}</p>
              <p className="text-xs text-muted-foreground">{m.online ? "Online" : (m.lastSeen ?? "Offline")}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
