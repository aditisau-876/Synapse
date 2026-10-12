import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Info, Video } from "lucide-react";
import { toast } from "sonner";

import ProfileAvatar from "@/components/layout/UserMenu/ProfileAvatar";
import { useChat } from "../../hooks/useChat";
import { useSendMessage } from "../../hooks/useSendMessage";
import { instantMeeting } from "@/features/meetings/services";
import { getErrorMessage } from "@/lib/errors";
import { relativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";

interface Props {
  onInfoClick: () => void;
  infoOpen: boolean;
}

export default function ChatHeader({ onInfoClick, infoOpen }: Props) {
  const navigate = useNavigate();
  const { conversation, setConversation } = useChat();
  const send = useSendMessage();
  const [calling, setCalling] = useState(false);

  if (!conversation) return null;

  const first = conversation.participants[0];
  const isGroup = conversation.type === "group";
  const status = isGroup
    ? conversation.participants.map((p) => p.name.split(" ")[0]).join(", ")
    : first?.online
      ? "Online"
      : first?.lastSeen
        ? `Last seen ${/^\d{4}-/.test(first.lastSeen) ? relativeTime(first.lastSeen) : first.lastSeen}`
        : "Offline";

  /** Start a meeting and drop the link into the chat so the other person can join. */
  const startCall = async () => {
    setCalling(true);
    try {
      const meeting = await instantMeeting();
      const link = `${window.location.origin}/app/meetings/${meeting.code}`;
      void send(conversation.id, `Join my video call: ${link}`);
      navigate(`/app/meetings/${meeting.code}`);
    } catch (error) {
      toast.error(getErrorMessage(error, "Couldn't start the call."));
    } finally {
      setCalling(false);
    }
  };

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-card px-2 md:px-4">
      <button
        type="button"
        onClick={() => setConversation(null)}
        aria-label="Back to chats"
        className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted md:hidden"
      >
        <ArrowLeft size={20} />
      </button>

      <button
        type="button"
        onClick={onInfoClick}
        className="flex min-w-0 flex-1 items-center gap-3 rounded-lg py-1 text-left"
      >
        <ProfileAvatar
          name={conversation.name}
          image={conversation.avatar}
          group={isGroup}
          online={isGroup ? undefined : first?.online}
          size="sm"
        />
        <span className="min-w-0">
          <span className="block truncate text-[15px] font-semibold leading-tight">
            {conversation.name}
          </span>
          <span className="block truncate text-xs text-muted-foreground">{status}</span>
        </span>
      </button>

      <button
        type="button"
        onClick={() => void startCall()}
        disabled={calling}
        aria-label="Start a video call"
        title="Start a video call"
        className="flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
      >
        <Video size={18} />
        <span className="hidden sm:inline">{calling ? "Starting…" : "Call"}</span>
      </button>
      <button
        type="button"
        onClick={onInfoClick}
        aria-label="Conversation details"
        aria-pressed={infoOpen}
        title="Details"
        className={cn(
          "flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-muted",
          infoOpen ? "bg-accent text-brand" : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Info size={18} />
      </button>
    </header>
  );
}
