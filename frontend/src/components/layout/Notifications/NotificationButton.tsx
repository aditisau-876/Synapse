import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Bell } from "lucide-react";

import NotificationDropdown from "./NotificationDropdown";
import { useNotificationStore } from "@/store/notification-store";

export default function NotificationButton() {
  const unread = useNotificationStore((s) => s.items.filter((i) => !i.read).length);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label={unread ? `Notifications, ${unread} unread` : "Notifications"}
          className="relative flex size-9 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Bell size={19} strokeWidth={1.9} />
          {unread > 0 && (
            <span className="absolute right-1 top-1 flex min-w-4 items-center justify-center rounded-full bg-spark px-1 text-[10px] font-bold leading-4 text-black ring-2 ring-card">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </button>
      </DropdownMenu.Trigger>
      <NotificationDropdown />
    </DropdownMenu.Root>
  );
}
