import { X } from "lucide-react";
import ChatInfo from "./ChatInfo";
import Members from "./Members";
import SidebarActions from "./SidebarActions";

export default function ChatSidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex min-h-full w-[340px] max-w-full flex-col">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-5">
        <h2 className="text-base font-semibold">Details</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
        >
          <X size={17} />
        </button>
      </div>
      <ChatInfo />
      <Members />
      <SidebarActions />
    </div>
  );
}
