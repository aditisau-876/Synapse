import { cn } from "@/lib/utils";

export const filters = ["All", "Unread", "Groups"] as const;
export type ConversationFilter = (typeof filters)[number];

interface Props {
  active: ConversationFilter;
  setActive: (filter: ConversationFilter) => void;
}

export default function ConversationFilters({ active, setActive }: Props) {
  return (
    <div role="tablist" aria-label="Filter chats" className="flex gap-1.5 px-3 pb-2">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          role="tab"
          aria-selected={active === filter}
          onClick={() => setActive(filter)}
          className={cn(
            "h-7 rounded-full px-3 text-[13px] font-medium transition-colors",
            active === filter
              ? "bg-[var(--synapse-accent-500)] text-white"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
