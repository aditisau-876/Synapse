import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import {
  User,
  Pencil,
  Bell,
  Moon,
  Smartphone,
  Shield,
  Settings,
  LogOut,
} from "lucide-react";

export default function ProfileDropdown() {
  return (
    <DropdownMenu.Content
      align="end"
      className="
      w-72
      rounded-2xl
      border
      border-border
      bg-background
      p-2
      shadow-2xl
      "
    >
      <DropdownMenu.Label className="px-3 py-2">
        <p className="font-semibold">Aditi Sau</p>
        <p className="text-xs text-muted-foreground">
          aditi@synapse.app
        </p>
      </DropdownMenu.Label>

      <DropdownMenu.Separator className="my-2 h-px bg-border" />

      <DropdownMenu.Item className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 outline-none hover:bg-muted">
        <User size={18} />
        My Profile
      </DropdownMenu.Item>

      <DropdownMenu.Item className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 outline-none hover:bg-muted">
        <Pencil size={18} />
        Edit Profile
      </DropdownMenu.Item>

      <DropdownMenu.Separator className="my-2 h-px bg-border" />

      <DropdownMenu.Item className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 outline-none hover:bg-muted">
        <Moon size={18} />
        Appearance
      </DropdownMenu.Item>

      <DropdownMenu.Item className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 outline-none hover:bg-muted">
        <Bell size={18} />
        Notifications
      </DropdownMenu.Item>

      <DropdownMenu.Item className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 outline-none hover:bg-muted">
        <Smartphone size={18} />
        Linked Devices
      </DropdownMenu.Item>

      <DropdownMenu.Item className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 outline-none hover:bg-muted">
        <Shield size={18} />
        Privacy & Security
      </DropdownMenu.Item>

      <DropdownMenu.Item className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 outline-none hover:bg-muted">
        <Settings size={18} />
        Settings
      </DropdownMenu.Item>

      <DropdownMenu.Separator className="my-2 h-px bg-border" />

      <DropdownMenu.Item
        className="
        flex
        cursor-pointer
        items-center
        gap-3
        rounded-xl
        px-3
        py-2
        text-red-500
        outline-none
        hover:bg-red-500/10
        "
      >
        <LogOut size={18} />
        Logout
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  );
}