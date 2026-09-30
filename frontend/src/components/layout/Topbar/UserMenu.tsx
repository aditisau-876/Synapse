import { ChevronDown, User } from "lucide-react";

export default function UserMenu() {
  return (
    <button
      type="button"
      className="
        flex items-center gap-2.5 rounded-xl px-2 py-1.5
        transition-colors hover:bg-muted/80
      "
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--synapse-accent-700)] to-[var(--synapse-accent-secondary)] text-white shadow-sm">
        <User size={17} />
      </div>

      <div className="hidden text-left lg:block">
        <p className="text-sm font-semibold leading-4">Aditi</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">Online</p>
      </div>

      <ChevronDown size={16} className="ml-0.5 text-muted-foreground" />
    </button>
  );
}
