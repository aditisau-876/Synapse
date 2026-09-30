import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative hidden w-full max-w-[520px] md:block">
      <Search
        size={17}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <input
        aria-label="Search Synapse"
        placeholder="Search chats, meetings, tasks..."
        className="
          h-10 w-full rounded-xl border border-border/80 bg-muted/35 pl-10 pr-16 text-sm
          text-foreground outline-none transition-all placeholder:text-muted-foreground
          focus:border-[var(--synapse-accent-500)]/50 focus:bg-background focus:ring-4
          focus:ring-[var(--synapse-accent-500)]/10
        "
      />
      <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground lg:block">
        Ctrl K
      </kbd>
    </div>
  );
}
