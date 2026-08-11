import {
  User,
  Shield,
  Bell,
  Palette,
  MessageSquare,
  Phone,
  HardDrive,
  HelpCircle,
  Info,
  UserCog,
} from "lucide-react";

export const settingsSections = [
  {
    id: "Profile",
    label: "Profile",
    description: "Your personal information",
    icon: User,
  },

  {
    id: "Account",
    label: "Account",
    description: "Account and security",
    icon: UserCog,
  },

  {
    id: "Privacy",
    label: "Privacy & Security",
    description: "Privacy and security controls",
    icon: Shield,
  },

  {
    id: "Notifications",
    label: "Notifications",
    description: "Manage your notifications",
    icon: Bell,
  },

  {
    id: "Appearance",
    label: "Appearance",
    description: "Theme and visual preferences",
    icon: Palette,
  },

  {
    id: "Chats",
    label: "Chats",
    description: "Chat preferences",
    icon: MessageSquare,
  },

  {
    id: "Calls",
    label: "Calls",
    description: "Calling preferences",
    icon: Phone,
  },

  {
    id: "Storage",
    label: "Storage",
    description: "Storage and data usage",
    icon: HardDrive,
  },

  {
    id: "Help",
    label: "Help & Support",
    description: "Get help with Synapse",
    icon: HelpCircle,
  },

  {
    id: "About",
    label: "About",
    description: "About Synapse",
    icon: Info,
  },
] as const;

export type SettingsSection =
  (typeof settingsSections)[number]["id"];