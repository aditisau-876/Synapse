import Logo from "@/components/landing/Logo";

export default function SidebarLogo({ collapsed }: { collapsed: boolean }) {
  return (
    <div className={`flex h-16 items-center ${collapsed ? "justify-center" : "px-5"}`}>
      <Logo to="/app/dashboard" markOnly={collapsed} />
    </div>
  );
}
