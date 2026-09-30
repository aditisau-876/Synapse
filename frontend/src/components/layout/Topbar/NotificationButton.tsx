import { Bell } from "lucide-react";

export default function NotificationButton() {
  return (
    <button
      type="button"
      aria-label="Notifications"
      className="
        relative flex h-10 w-10 items-center justify-center rounded-xl
        text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground
      "
    >
      <Bell size={19} strokeWidth={1.9} />
      <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-[var(--synapse-accent-500)] ring-2 ring-background" />
    </button>
  );
}
