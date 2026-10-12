import {
  LayoutDashboard,
  MessageSquare,
  Video,
  CheckSquare,
  PencilLine,
  BrainCircuit,
  Settings,
} from "lucide-react";

export interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  /** Shown in the mobile tab bar. */
  mobile?: boolean;
}

/** Communication first: it's what people open Synapse for. */
export const primaryNav: NavItem[] = [
  { label: "Chats", icon: MessageSquare, href: "/app/chats", mobile: true },
  { label: "Meetings", icon: Video, href: "/app/meetings", mobile: true },
  { label: "Home", icon: LayoutDashboard, href: "/app/dashboard", mobile: true },
];

export const workspaceNav: NavItem[] = [
  { label: "Tasks", icon: CheckSquare, href: "/app/tasks", mobile: true },
  { label: "Whiteboard", icon: PencilLine, href: "/app/whiteboard" },
  { label: "AI Workspace", icon: BrainCircuit, href: "/app/ai-workspace", mobile: true },
];

export const settingsNav: NavItem = {
  label: "Settings",
  icon: Settings,
  href: "/app/settings",
};

export const navigation: NavItem[] = [...primaryNav, ...workspaceNav, settingsNav];
