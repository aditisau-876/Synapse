import UserMenu from "../UserMenu/UserMenu";

export default function SidebarProfile({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="border-t border-border p-3">
      <UserMenu variant={collapsed ? "avatar" : "full"} side="top" align="start" />
    </div>
  );
}
