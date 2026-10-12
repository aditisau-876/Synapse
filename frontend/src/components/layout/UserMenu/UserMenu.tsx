import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";
import { ChevronsUpDown } from "lucide-react";

import ProfileAvatar from "./ProfileAvatar";
import ProfileDropdown from "./ProfileDropdown";
import LogoutDialog from "./LogoutDialog";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { logout as logoutRequest } from "@/features/auth/api/auth-api";
import { cn } from "@/lib/utils";

interface Props {
  variant?: "avatar" | "full";
  side?: "top" | "bottom";
  align?: "start" | "end";
}

export default function UserMenu({ variant = "avatar", side = "bottom", align = "end" }: Props) {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.logout);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const name = user?.name ?? "Guest";

  const signOut = async () => {
    try {
      // Best effort: revoke on the server, but always clear the local session.
      await logoutRequest();
    } catch {
      /* offline or already expired */
    }
    clearSession();
    setConfirmOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            aria-label="Account menu"
            className={cn(
              "flex items-center gap-2.5 rounded-lg text-left outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
              variant === "full" ? "w-full p-2" : "rounded-full p-0.5",
            )}
          >
            <ProfileAvatar name={name} image={user?.avatar} online size={variant === "full" ? "sm" : "sm"} />
            {variant === "full" && (
              <>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{name}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {user?.email ?? "Not signed in"}
                  </span>
                </span>
                <ChevronsUpDown size={15} className="shrink-0 text-muted-foreground" />
              </>
            )}
          </button>
        </DropdownMenu.Trigger>
        <ProfileDropdown side={side} align={align} onSignOut={() => setConfirmOpen(true)} />
      </DropdownMenu.Root>

      <LogoutDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onLogout={() => void signOut()}
      />
    </>
  );
}
