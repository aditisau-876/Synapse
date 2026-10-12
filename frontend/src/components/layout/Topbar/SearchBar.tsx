import { Search } from "lucide-react";
import { useCommandStore } from "@/store/command-store";

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

/** A button that looks like a field and opens the command palette. */
export default function SearchBar() {
  const setOpen = useCommandStore((s) => s.setOpen);

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Search or jump to"
      className="flex h-9 w-full max-w-md items-center gap-2.5 rounded-lg border border-border bg-background px-3 text-sm text-muted-foreground outline-none transition-colors hover:border-input focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Search size={16} className="shrink-0" />
      <span className="flex-1 truncate text-left">Search or jump to…</span>
      <kbd className="hidden rounded border border-border bg-card px-1.5 py-0.5 text-[11px] font-medium sm:block">
        {isMac ? "⌘K" : "Ctrl K"}
      </kbd>
    </button>
  );
}
