import {
  Bell,
  CircleUserRound,
  HelpCircle,
  HardDrive,
  MessageSquare,
  MonitorSmartphone,
  Palette,
  Phone,
  Shield,
  User,
} from "lucide-react";

const items = [
  { label: "Profile", icon: CircleUserRound },
  { label: "Account", icon: User },
  { label: "Privacy", icon: Shield },
  { label: "Notifications", icon: Bell },
  { label: "Appearance", icon: Palette },
  { label: "Chats", icon: MessageSquare },
  { label: "Calls", icon: Phone },
  { label: "Storage", icon: HardDrive },
  { label: "Sessions", icon: MonitorSmartphone },
  { label: "Help", icon: HelpCircle },
];

interface Props {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function SettingsSidebar({ activeSection, setActiveSection }: Props) {
  return (
    <aside className="w-full shrink-0 border-b border-border/70 pb-5 lg:w-[270px] lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
      <div className="px-2 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Workspace
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          Manage your Synapse experience
        </p>
      </div>

      <nav className="space-y-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.label;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setActiveSection(item.label)}
              aria-current={isActive ? "page" : undefined}
              className={`
                group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "bg-[var(--synapse-accent-500)]/12 text-[var(--synapse-accent-600)] shadow-sm dark:text-[var(--synapse-accent-300)]"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }
              `}
            >
              {isActive && (
                <span className="absolute left-0 top-2.5 h-6 w-1 rounded-r-full bg-[var(--synapse-accent-500)]" />
              )}

              <span
                className={`
                  flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors
                  ${
                    isActive
                      ? "bg-[var(--synapse-accent-500)] text-white"
                      : "bg-muted/70 text-muted-foreground group-hover:bg-muted group-hover:text-foreground"
                  }
                `}
              >
                <Icon size={18} strokeWidth={1.9} />
              </span>

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
