import {
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarProfile from "./SidebarProfile";

import { navigation } from "@/constants/navigation";
import { useSidebarStore } from "@/store/sidebar-store";

export default function Sidebar() {
  const { collapsed, toggle } = useSidebarStore();

  return (
    <aside
      className={`
      flex
      h-screen
      flex-col
      border-r
      border-border
      bg-background/90
      backdrop-blur-xl
      transition-all
      duration-300

      ${
        collapsed
          ? "w-[88px]"
          : "w-[280px]"
      }
      `}
    >
      <SidebarLogo
        collapsed={collapsed}
      />

      <div className="flex justify-end px-4 py-3">

        <button
          onClick={toggle}
          className="
          rounded-xl
          p-2
          transition
          hover:bg-muted
          "
        >
          {collapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>

      </div>

      <nav
        className="
        flex-1
        space-y-1.5
        overflow-y-auto
        px-4
        "
      >
        {navigation.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            href={item.href}
            collapsed={collapsed}
          />
        ))}
      </nav>

      <SidebarProfile
        collapsed={collapsed}
      />

    </aside>
  );
}