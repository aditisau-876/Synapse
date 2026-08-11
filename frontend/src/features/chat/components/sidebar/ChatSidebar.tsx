import ChatInfo from "./ChatInfo";
import SharedMedia from "./SharedMedia";
import SharedFiles from "./SharedFiles";
import Members from "./Members";
import SidebarActions from "./SidebarActions";

export default function ChatSidebar() {
  return (
    <aside
      className="
      hidden
      h-full
      w-[340px]
      overflow-y-auto
      border-l
      border-border
      bg-background
      xl:block
      "
    >
      <ChatInfo />

      <SharedMedia />

      <SharedFiles />

      <Members />

      <SidebarActions />
    </aside>
  );
}