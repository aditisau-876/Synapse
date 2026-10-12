import { Bell, BellOff } from "lucide-react";
import { useChat } from "../../hooks/useChat";
import { useChatStore } from "../../store/chat-store";

export default function SidebarActions() {
  const { conversation } = useChat();
  const muted = useChatStore((s) => (conversation ? s.mutedIds.includes(conversation.id) : false));
  const toggleMute = useChatStore((s) => s.toggleMute);
  if (!conversation) return null;

  return (
    <div className="p-3">
      <button
        type="button"
        onClick={() => toggleMute(conversation.id)}
        aria-pressed={muted}
        className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium hover:bg-muted"
      >
        {muted ? <Bell size={17} /> : <BellOff size={17} />}
        {muted ? "Unmute notifications" : "Mute notifications"}
      </button>
    </div>
  );
}
