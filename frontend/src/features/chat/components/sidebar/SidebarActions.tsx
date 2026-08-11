import {
  BellOff,
  Shield,
  Ban,
} from "lucide-react";

export default function SidebarActions() {
  return (
    <div className="p-6">

      <button className="mb-3 flex w-full items-center gap-3 rounded-xl p-3 hover:bg-muted">
        <BellOff size={18} />
        Mute Notifications
      </button>

      <button className="mb-3 flex w-full items-center gap-3 rounded-xl p-3 hover:bg-muted">
        <Shield size={18} />
        Privacy Settings
      </button>

      <button className="flex w-full items-center gap-3 rounded-xl p-3 text-red-500 hover:bg-red-500/10">
        <Ban size={18} />
        Block User
      </button>

    </div>
  );
}