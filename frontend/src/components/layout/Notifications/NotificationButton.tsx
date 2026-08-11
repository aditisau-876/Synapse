import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { Bell } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";

export default function NotificationButton() {
  return (
    <DropdownMenu.Root>

      <DropdownMenu.Trigger asChild>

        <button
          className="
          relative
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          transition
          hover:bg-muted
          "
        >
          <Bell size={20} />

          <span
            className="
            absolute
            right-2
            top-2
            h-2.5
            w-2.5
            rounded-full
            bg-red-500
            "
          />

        </button>

      </DropdownMenu.Trigger>

      <NotificationDropdown />

    </DropdownMenu.Root>
  );
}