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
        gap-3.5
        rounded-xl
        px-3.5
        py-2.5
        transition-all

        ${
          collapsed ? "justify-center" : ""
        }

        ${
          isActive
            ? "bg-[var(--synapse-accent-500)]/12 text-[var(--synapse-accent-600)] shadow-sm dark:text-[var(--synapse-accent-300)]"
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