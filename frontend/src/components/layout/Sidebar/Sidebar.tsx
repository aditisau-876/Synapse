import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarProfile from "./SidebarProfile";

import { primaryNav, workspaceNav, settingsNav } from "@/constants/navigation";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const { collapsed, toggle } = useSidebarStore();

  return (
    <aside
      aria-label="Primary"
      className={cn(
        "hidden h-full shrink-0 flex-col border-r border-border bg-card transition-[width] duration-200 md:flex",
        collapsed ? "w-[68px]" : "w-[232px]",
      )}
    >
      <SidebarLogo collapsed={collapsed} />

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pt-2">
        <div className="space-y-1">
          {primaryNav.map((item) => (
            <SidebarItem key={item.href} {...item} collapsed={collapsed} />
          ))}
        </div>

        <div className="space-y-1">
          {!collapsed && (
            <p className="px-3 pb-1 text-xs font-medium text-muted-foreground">
              Workspace
            </p>
          )}
          {collapsed && <div className="mx-3 border-t border-border" />}
          {workspaceNav.map((item) => (
            <SidebarItem key={item.href} {...item} collapsed={collapsed} />
          ))}
        </div>
      </nav>

      <div className="space-y-1 px-3 pb-2">
        <SidebarItem {...settingsNav} collapsed={collapsed} />
        <button
          type="button"
          onClick={toggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
            collapsed && "justify-center px-0",
          )}
        >
          {collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>

      <SidebarProfile collapsed={collapsed} />
    </aside>
  );
}
