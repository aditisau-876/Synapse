import {
  Mic,
  Video,
  MonitorUp,
  Smile,
  MessageCircle,
  Users,
  Sparkles,
  PhoneOff,
} from "lucide-react";

import ToolbarButton from "./ToolbarButton";
import ToolbarDivider from "./ToolbarDivider";

export default function FloatingToolbar() {
  return (
    <div
      className="
      fixed
      bottom-8
      left-1/2
      z-50
      -translate-x-1/2
      "
    >
      <div
        className="
        flex
        items-center
        gap-3
        rounded-full
        border
        border-white/10
        bg-black/50
        px-5
        py-4
        shadow-2xl
        backdrop-blur-2xl
        "
      >
        <ToolbarButton
          icon={Mic}
          label="Microphone"
          active
        />

        <ToolbarButton
          icon={Video}
          label="Camera"
          active
        />

        <ToolbarButton
          icon={MonitorUp}
          label="Share Screen"
        />

        <ToolbarDivider />

        <ToolbarButton
          icon={Smile}
          label="Reactions"
        />

        <ToolbarButton
          icon={MessageCircle}
          label="Chat"
        />

        <ToolbarButton
          icon={Users}
          label="Participants"
        />

        <ToolbarButton
          icon={Sparkles}
          label="AI Assistant"
        />

        <ToolbarDivider />

        <ToolbarButton
          icon={PhoneOff}
          label="Leave"
          danger
        />
      </div>
    </div>
  );
}