import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Props {
  icon: React.ElementType;
  label: string;
  href: string;
  collapsed: boolean;
}

export default function SidebarItem({ icon: Icon, label, href, collapsed }: Props) {
  return (
    <NavLink
      to={href}
      title={collapsed ? label : undefined}
      aria-label={collapsed ? label : undefined}
      className={({ isActive }: { isActive: boolean }) =>
        cn(
          "relative flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
          collapsed && "justify-center px-0",
          isActive
            ? "bg-accent text-brand"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )
      }
    >
      {({ isActive }: { isActive: boolean }) => (
        <>
          {/* The active "thread": a short bar on the leading edge. */}
          {isActive && (
            <span className="absolute -left-3 top-2 h-6 w-[3px] rounded-r-full bg-[var(--synapse-accent-500)]" />
          )}
          <Icon size={19} strokeWidth={1.9} className="shrink-0" />
          {!collapsed && <span className="truncate">{label}</span>}
        </>
      )}
    </NavLink>
  );
}
