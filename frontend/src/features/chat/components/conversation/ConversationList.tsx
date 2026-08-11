import { useMemo, useState } from "react";

import ConversationHeader from "./ConversationHeader";
import ConversationSearch from "./ConversationSearch";
import ConversationFilters from "./ConversationFilters";
import ConversationItem from "./ConversationItem";

import { useChat } from "../../hooks/useChat";

export default function ConversationList() {
  const { conversations } = useChat();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return conversations.filter((conversation) => {
      const matchesSearch = conversation.name
        .toLowerCase()
        .includes(search.toLowerCase());

      if (!matchesSearch) return false;

      switch (filter) {
        case "Unread":
          return conversation.unreadCount > 0;

        case "Groups":
          return conversation.type === "group";

        case "Archived":
          return conversation.archived;

        default:
          return true;
      }
    });
  }, [conversations, search, filter]);

  return (
    <div
      className="
        flex
        h-full
        flex-col
        border-r
        border-border
        bg-background        
      "
    >
      <ConversationHeader />

      <ConversationSearch
        value={search}
        onChange={setSearch}
      />

      <ConversationFilters
        active={filter}
        setActive={setFilter}
      />

      <div
        className="
          flex-1
          overflow-y-auto
          px-3
          pb-4
          space-y-2
        "
      >
        {filtered.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
          />
        ))}
      </div>
    </div>
  );
}