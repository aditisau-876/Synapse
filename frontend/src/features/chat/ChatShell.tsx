import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

import ConversationList from "./components/conversation/ConversationList";
import ChatHeader from "./components/messages/ChatHeader";
import MessageList from "./components/messages/MessageList";
import MessageComposer from "./components/composer/MessageComposer";
import ChatSidebar from "./components/sidebar/ChatSidebar";
import EmptyState from "@/components/common/EmptyState";
import { useChat, useChatSync } from "./hooks/useChat";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

/**
 * Three panes on desktop (list | thread | info). On phones the list and the
 * thread take turns, like WhatsApp: opening a chat covers the whole screen.
 */
export default function ChatShell() {
  useChatSync();

  const { conversations, conversation, selectedConversationId, setConversation } = useChat();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isWide = useMediaQuery("(min-width: 1280px)");
  const [showInfo, setShowInfo] = useState(false);

  // On desktop an empty thread pane is wasted space: open the first chat.
  useEffect(() => {
    if (isDesktop && !selectedConversationId && conversations.length > 0) {
      setConversation(conversations[0].id);
    }
  }, [isDesktop, selectedConversationId, conversations, setConversation]);

  const threadOpen = Boolean(conversation);

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      <section
        aria-label="Conversations"
        className="flex w-full min-w-0 flex-col border-r border-border bg-card md:w-[340px] md:shrink-0"
      >
        <ConversationList />
      </section>

      <section
        aria-label="Conversation"
        className={cn(
          "min-w-0 flex-1 flex-col bg-background",
          // Phones: the open thread covers everything, including the tab bar.
          threadOpen ? "fixed inset-0 z-40 flex md:static md:z-auto" : "hidden md:flex",
        )}
      >
        {conversation ? (
          <>
            <ChatHeader onInfoClick={() => setShowInfo((v) => !v)} infoOpen={showInfo} />
            <MessageList />
            <MessageComposer />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <EmptyState
              icon={MessageSquare}
              title="Pick a conversation"
              description="Choose a chat from the list, or start a new one with the + button."
            />
          </div>
        )}
      </section>

      {showInfo && conversation && (
        <>
          {!isWide && (
            <button
              type="button"
              aria-label="Close details"
              onClick={() => setShowInfo(false)}
              className="animate-fade fixed inset-0 z-[45] bg-black/40"
            />
          )}
          <aside
            aria-label="Conversation details"
            className={cn(
              "animate-slide-in w-[340px] shrink-0 overflow-y-auto border-l border-border bg-card",
              isWide ? "" : "fixed inset-y-0 right-0 z-50 max-w-full shadow-2xl",
            )}
          >
            <ChatSidebar onClose={() => setShowInfo(false)} />
          </aside>
        </>
      )}
    </div>
  );
}
