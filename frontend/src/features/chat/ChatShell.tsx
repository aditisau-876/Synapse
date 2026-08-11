import { useState } from "react";

import ConversationList from "./components/conversation/ConversationList";
import ChatHeader from "./components/messages/ChatHeader";
import MessageList from "./components/messages/MessageList";
import MessageComposer from "./components/composer/MessageComposer";
import ChatSidebar from "./components/sidebar/ChatSidebar";

export default function ChatShell() {

  const [showInfo, setShowInfo] = useState(false);

  return (

    <div className="flex h-full overflow-hidden">
      <aside
        className="
        hidden
        w-[360px]
        shrink-0
        border-r
        border-border
        bg-background
        lg:block
      "
      >
        <ConversationList />
      </aside>
      <main
  className="
  relative
  flex
  min-w-0
  flex-1
  flex-col
  overflow-hidden
  
  "
>
  {/* ---------- LIGHT MODE BACKGROUND ---------- */}

  <div
    className="
    pointer-events-none
    absolute
    inset-0

    block
    dark:hidden

    bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_65%)]
    "
  />

  <div
    className="
    pointer-events-none
    absolute
    inset-0

    block
    dark:hidden

    opacity-[0.05]

    [background-image:radial-gradient(circle_at_1px_1px,#8b5cf6_1px,transparent_0)]
    [background-size:34px_34px]
    "
  />

  {/* ---------- DARK MODE GLOWS ---------- */}

  <div
    className="
    pointer-events-none
    absolute
    left-1/2
    top-1/2
    hidden
    h-[650px]
    w-[650px]
    -translate-x-1/2
    -translate-y-1/2
    rounded-full
    blur-3xl

    dark:block
    dark:bg-[var(--synapse-accent-500)]/15
    "
  />

  <div
    className="
    pointer-events-none
    absolute
    -right-40
    bottom-0
    hidden
    h-[420px]
    w-[420px]
    rounded-full
    blur-3xl

    dark:block
    dark:bg-cyan-400/10
    "
  />

  <div className="relative z-10">
    <ChatHeader
      onInfoClick={() => setShowInfo((v) => !v)}
    />
  </div>

  <div className="relative z-10 flex-1 overflow-hidden">
    <MessageList />
  </div>

  <div className="relative z-10">
    <MessageComposer />
  </div>
</main>
      
      {showInfo && (
        <aside
          className="
          hidden
          w-[340px]
          shrink-0
          border-l
          border-border
          bg-background
          xl:block
        "
        >
          <ChatSidebar />
        </aside>
      )}

    </div>

  );

}