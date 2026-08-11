import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import ProfileAvatar from "./ProfileAvatar";
import ProfileDropdown from "./ProfileDropdown";

export default function UserMenu() {
  return (
    <DropdownMenu.Root>

      <DropdownMenu.Trigger asChild>

        <button
          className="
          flex
          items-center
          gap-3
          rounded-xl
          px-2
          py-2
          transition
          hover:bg-muted
          "
        >
          <ProfileAvatar
            name="Aditi Sau"
          />

          <div className="hidden text-left lg:block">
            <p className="text-sm font-semibold">
              Aditi Sau
            </p>

            <p className="text-xs text-muted-foreground">
              Online
            </p>
          </div>

        </button>

      </DropdownMenu.Trigger>

      <ProfileDropdown />

    </DropdownMenu.Root>
  );
}