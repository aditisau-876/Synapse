import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";
import { BellOff } from "lucide-react";

import NotificationItem from "./NotificationItem";
import { useNotificationStore } from "@/store/notification-store";

export default function NotificationDropdown() {
  const navigate = useNavigate();
  const items = useNotificationStore((s) => s.items);
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const markRead = useNotificationStore((s) => s.markRead);

  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        align="end"
        sideOffset={8}
        className="z-[60] w-[min(22rem,calc(100vw-1.5rem))] rounded-xl border border-border bg-popover p-1.5 shadow-xl"
      >
        <div className="flex items-center justify-between px-2.5 py-1.5">
          <h3 className="text-sm font-semibold">Notifications</h3>
          {items.some((i) => !i.read) && (
            <button
              type="button"
              onClick={markAllRead}
              className="text-xs font-medium text-brand hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-8 text-center">
            <BellOff size={20} className="mb-2 text-muted-foreground" />
            <p className="text-sm font-medium">You're all caught up</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              New messages and meeting invites will show up here.
            </p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {items.map((n) => (
              <DropdownMenu.Item
                key={n.id}
                onSelect={() => {
                  markRead(n.id);
                  if (n.href) navigate(n.href);
                }}
                className="cursor-pointer rounded-lg outline-none data-[highlighted]:bg-muted"
              >
                <NotificationItem notification={n} />
              </DropdownMenu.Item>
            ))}
          </div>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}
