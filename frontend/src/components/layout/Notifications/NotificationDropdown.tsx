import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import NotificationItem from "./NotificationItem";
import { notifications } from "./notifications";

export default function NotificationDropdown() {
  return (
    <DropdownMenu.Content
      align="end"
      className="
      w-96
      rounded-2xl
      border
      bg-background
      p-3
      shadow-2xl
      "
    >
      <div className="mb-3 flex items-center justify-between">

        <h3 className="font-bold">
          Notifications
        </h3>

        <button className="text-sm text-[var(--synapse-accent-500)]">
          Mark all read
        </button>

      </div>

      <div className="space-y-2">

        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
          />
        ))}

      </div>

    </DropdownMenu.Content>
  );
}