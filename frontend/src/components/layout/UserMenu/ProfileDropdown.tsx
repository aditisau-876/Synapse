import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { LogOut, Monitor, Moon, Settings, Sun, User } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { cn } from "@/lib/utils";

interface Props {
  side?: "top" | "bottom";
  align?: "start" | "end";
  onSignOut: () => void;
}

const item =
  "flex h-9 cursor-pointer items-center gap-2.5 rounded-lg px-2.5 text-sm outline-none data-[highlighted]:bg-muted";

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export default function ProfileDropdown({ side = "bottom", align = "end", onSignOut }: Props) {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        side={side}
        align={align}
        sideOffset={8}
        className="z-[60] w-64 rounded-xl border border-border bg-popover p-1.5 shadow-xl"
      >
        <div className="px-2.5 pb-2 pt-1.5">
          <p className="truncate text-sm font-semibold">{user?.name ?? "Guest"}</p>
          <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
        </div>

        <DropdownMenu.Separator className="my-1 h-px bg-border" />

        <DropdownMenu.Item className={item} onSelect={() => navigate("/app/settings/profile")}>
          <User size={16} /> Profile
        </DropdownMenu.Item>
        <DropdownMenu.Item className={item} onSelect={() => navigate("/app/settings")}>
          <Settings size={16} /> Settings
        </DropdownMenu.Item>

        <DropdownMenu.Separator className="my-1 h-px bg-border" />

        <div className="px-2.5 py-1.5">
          <p className="mb-1.5 text-xs text-muted-foreground">Theme</p>
          <div className="grid grid-cols-3 gap-1 rounded-lg bg-muted p-1">
            {themes.map(({ value, label, icon: Icon }) => (
              <DropdownMenu.Item
                key={value}
                onSelect={(e: Event) => {
                  e.preventDefault();
                  setTheme(value);
                }}
                aria-label={`${label} theme`}
                title={label}
                className={cn(
                  "flex h-7 cursor-pointer items-center justify-center rounded-md outline-none",
                  theme === value
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground data-[highlighted]:text-foreground",
                )}
              >
                <Icon size={15} />
              </DropdownMenu.Item>
            ))}
          </div>
        </div>

        <DropdownMenu.Separator className="my-1 h-px bg-border" />

        <DropdownMenu.Item
          className={cn(item, "text-destructive data-[highlighted]:bg-destructive/10")}
          onSelect={onSignOut}
        >
          <LogOut size={16} /> Sign out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}
