import {
  Bell, CircleUserRound, HelpCircle, HardDrive, MessageSquare,
  MonitorSmartphone, Palette, Phone, Shield, User,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const settingsItems = [
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
    <aside className="shrink-0 lg:w-56">
      <h1 className="px-1 pb-3 text-2xl font-bold lg:pb-4">Settings</h1>

      {/* Tabs on small screens, a list from lg up. */}
      <nav
        aria-label="Settings sections"
        className="scrollbar-none -mx-4 flex gap-1 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
      >
        {settingsItems.map(({ label, icon: Icon }) => {
          const isActive = activeSection === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setActiveSection(label)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex h-9 shrink-0 items-center gap-2.5 rounded-lg px-3 text-sm font-medium transition-colors lg:h-10 lg:w-full",
                isActive
                  ? "bg-accent text-brand"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon size={17} strokeWidth={1.9} />
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
