import { NavLink } from "react-router-dom";

interface Props {
  icon: React.ElementType;
  label: string;
  href: string;
  collapsed: boolean;
}

export default function SidebarItem({
  icon: Icon,
  label,
  href,
  collapsed,
}: Props) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `
        group
        flex
        items-center
        gap-4
        rounded-2xl
        px-4
        py-3
        transition-all

        ${
          collapsed ? "justify-center" : ""
        }

        ${
          isActive
            ? "bg-[var(--synapse-accent-500)] text-[var(--synapse-accent-500)]-foreground shadow-lg hover:bg-[var(--synapse-accent-500)]/90"
            : "hover:bg-muted"
        }
        `
      }
    >
      <Icon
        size={21}
        className="shrink-0"
      />

      {!collapsed && (
        <span className="font-medium">
          {label}
        </span>
      )}
    </NavLink>
  );
}