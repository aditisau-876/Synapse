import {
  Phone,
  Video,
  Search,
  MoreVertical,
  Info,
} from "lucide-react";

import { useChat } from "../../hooks/useChat";
import ProfileAvatar from "@/components/layout/UserMenu/ProfileAvatar";

interface Props {
  onInfoClick: () => void;
}

export default function ChatHeader({
  onInfoClick,
}: Props) {
  const { conversation } = useChat();

  if (!conversation) {
    return null;
  }

  const online =
    conversation.participants[0]?.online ?? false;

  return (
    <header
      className="
        flex
        items-center
        justify-between

        border-b
        border-border/60

        bg-background/80

        px-6
        py-4

        backdrop-blur-xl
        transition-all
        duration-200
        bg-gradient-to-r
        from-[var(--synapse-accent-600)]
to-[var(--synapse-accent-300)]
        text-white
        shadow-lg
        shadow-[var(--synapse-accent-500)]/20
        scale-[1.01]
      "
    >
      <div className="flex items-center gap-4">
        <ProfileAvatar
          name={conversation.name}
          online={online}
        />

        <div>
          <h2 className="font-semibold">
            {conversation.name}
          </h2>

          <p className="text-sm text-muted-foreground">
            {online
              ? "Online"
              : "Last seen recently"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          className="
            rounded-xl
            p-2.5

            text-muted-foreground

            transition-all
            duration-200

            hover:bg-[var(--synapse-accent-500)]/10
hover:text-[var(--synapse-accent-500)]
dark:hover:bg-[var(--synapse-accent-500)]/10
dark:hover:text-[var(--synapse-accent-500)]
          "
        >
          <Phone size={19} />
        </button>

        <button
          className="
            rounded-xl
            p-2.5

            text-muted-foreground

            transition-all
            duration-200

            hover:bg-[var(--synapse-accent-500)]/10
hover:text-[var(--synapse-accent-500)]
dark:hover:bg-[var(--synapse-accent-500)]/10
dark:hover:text-[var(--synapse-accent-500)]
          "
        >
          <Video size={19} />
        </button>

        <button
          className="
            rounded-xl
            p-2.5

            text-muted-foreground

            transition-all
            duration-200

            hover:bg-[var(--synapse-accent-500)]/10
hover:text-[var(--synapse-accent-500)]
dark:hover:bg-[var(--synapse-accent-500)]/10
dark:hover:text-[var(--synapse-accent-500)]
          "
        >
          <Search size={19} />
        </button>

        <button
          onClick={onInfoClick}
          className="
            rounded-xl
            p-2.5

            text-muted-foreground

            transition-all
            duration-200

            hover:bg-[var(--synapse-accent-500)]/10
hover:text-[var(--synapse-accent-500)]
dark:hover:bg-[var(--synapse-accent-500)]/10
dark:hover:text-[var(--synapse-accent-500)]
          "
        >
          <Info size={19} />
        </button>

        <button
          className="
            rounded-xl
            p-2.5

            text-muted-foreground

            transition-all
            duration-200

            hover:bg-[var(--synapse-accent-500)]/10
hover:text-[var(--synapse-accent-500)]
dark:hover:bg-[var(--synapse-accent-500)]/10
dark:hover:text-[var(--synapse-accent-500)]
          "
        >
          <MoreVertical size={19} />
        </button>
      </div>
    </header>
  );
}