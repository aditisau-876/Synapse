import { NavLink } from "react-router-dom";
import { navigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";

const items = navigation.filter((i) => i.mobile);

/** Bottom tab bar for phones; the sidebar takes over from the md breakpoint up. */
export default function MobileNav() {
  return (
    <nav
      aria-label="Primary"
      className="pb-safe fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-card md:hidden"
    >
      {items.map(({ label, icon: Icon, href }) => (
        <NavLink
          key={href}
          to={href}
          className={({ isActive }: { isActive: boolean }) =>
            cn(
              "flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium",
              isActive ? "text-brand" : "text-muted-foreground",
            )
          }
        >
          <Icon size={20} strokeWidth={1.9} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
