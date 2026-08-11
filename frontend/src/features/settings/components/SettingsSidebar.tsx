import {
  User,
  Shield,
  Bell,
  Palette,
  MessageSquare,
  Phone,
  HardDrive,
  HelpCircle,
  CircleUserRound,MonitorSmartphone
} from "lucide-react";

const items = [
  {
    label: "Profile",
    icon: CircleUserRound,
  },
  {
    label: "Account",
    icon: User,
  },
  {
    label: "Privacy",
    icon: Shield,
  },
  {
    label: "Notifications",
    icon: Bell,
  },
  {
    label: "Appearance",
    icon: Palette,
  },
  {
    label: "Chats",
    icon: MessageSquare,
  },
  {
    label: "Calls",
    icon: Phone,
  },
  {
    label: "Storage",
    icon: HardDrive,
  },
  {
  label: "Sessions",
  icon: MonitorSmartphone,
},
  {
    label: "Help",
    icon: HelpCircle,
  },
];

interface Props {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function SettingsSidebar({
  activeSection,
  setActiveSection,
}: Props) {
  return (
    <aside className="w-full shrink-0 border-b border-border lg:w-64 lg:border-b-0 lg:border-r">
      
      {/* Header */}
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Settings
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your Synapse experience
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 px-3 pb-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.label;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setActiveSection(item.label)}
              className={`
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-left
                text-sm
                font-medium
                transition-all
                duration-200

                ${
                  isActive
                    ? "bg-[var(--synapse-accent-500)] text-[var(--synapse-accent-500)]-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }
              `}
            >
              <Icon size={19} />

              <span>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}