import {
  LayoutDashboard,
  MessageSquare,
  Phone,
  CheckSquare,
  BrainCircuit,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/app/dashboard",
  },

  {
    label: "Chats",
    icon: MessageSquare,
    href: "/app/chats",
  },

  {
    label: "Meetings",
    icon: Phone,
    href: "/app/meetings",
  },

  {
    label: "Tasks",
    icon: CheckSquare,
    href: "/app/tasks",
  },


  {
    label: "AI Workspace",
    icon: BrainCircuit,
    href: "/app/ai-workspace",
  },

  {
    label: "Settings",
    icon: Settings,
    href: "/app/settings",
  },
];