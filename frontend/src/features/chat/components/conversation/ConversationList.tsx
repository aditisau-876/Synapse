import { useMemo, useState } from "react";
import { MessageSquarePlus, WifiOff } from "lucide-react";

import ConversationHeader from "./ConversationHeader";
import ConversationSearch from "./ConversationSearch";
import ConversationFilters, { type ConversationFilter } from "./ConversationFilters";
import ConversationItem from "./ConversationItem";
import NewChatDialog from "./NewChatDialog";
import EmptyState from "@/components/common/EmptyState";
import { useChat } from "../../hooks/useChat";

export default function ConversationList() {
  const { conversations, source } = useChat();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ConversationFilter>("All");
  const [newChatOpen, setNewChatOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return conversations.filter((c) => {
      if (q && !c.name.toLowerCase().includes(q)) return false;
      if (filter === "Unread") return c.unreadCount > 0;
      if (filter === "Groups") return c.type === "group";
      return true;
    });
  }, [conversations, search, filter]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <ConversationHeader onNewChat={() => setNewChatOpen(true)} />
      <ConversationSearch value={search} onChange={setSearch} />
      <ConversationFilters active={filter} setActive={setFilter} />

      {source === "demo" && (
        <div className="mx-3 mb-2 flex items-start gap-2 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
          <WifiOff size={14} className="mt-0.5 shrink-0" />
          <span>Can't reach the server. Showing sample chats; messages stay on this device.</span>
        </div>
      )}

      <div className="min-h-0 flex-1 space-y-0.5 overflow-y-auto px-2 pb-3">
        {source === "loading" && (
          <div className="space-y-2 p-2" aria-label="Loading chats">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="size-10 animate-pulse rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        )}

        {source !== "loading" && conversations.length === 0 && (
          <EmptyState
            icon={MessageSquarePlus}
            title="No chats yet"
            description="Find someone by name or email to start your first encrypted conversation."
            buttonText="Start a chat"
            onAction={() => setNewChatOpen(true)}
          />
        )}

        {source !== "loading" && conversations.length > 0 && filtered.length === 0 && (
          <p className="px-3 py-8 text-center text-sm text-muted-foreground">
            No chats match.
          </p>
        )}

        {filtered.map((c) => (
          <ConversationItem key={c.id} conversation={c} />
        ))}
      </div>

      <NewChatDialog open={newChatOpen} onOpenChange={setNewChatOpen} />
    </div>
  );
}
