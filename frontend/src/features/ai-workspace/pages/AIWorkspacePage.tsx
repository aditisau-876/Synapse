import AIWorkspaceHeader from "../components/AIWorkspaceHeader";
import AIHero from "../components/AIHero";
import AIInput from "../components/AIInput";
import AISuggestionGrid from "../components/AISuggestionGrid";
import AIConversation from "../components/AIConversation";
import AIEmptyState from "../components/AIEmptyState";

import { useAIWorkspace } from "../hooks/useAIWorkspace";

export default function AIWorkspacePage() {
  const {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
    clearConversation,
  } = useAIWorkspace();

  const hasConversation = messages.length > 0;

  const handleSend = async () => {
    if (!input.trim() || isLoading) {
      return;
    }

    await sendMessage(input);
  };

  const handleSuggestionClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl space-y-6 p-6 lg:p-8">

        {/* Header */}
        <AIWorkspaceHeader />

        {!hasConversation ? (
          <>
            {/* Hero */}
            <AIHero
              hasConversation={false}
            />

            {/* Input */}
            <AIInput
              value={input}
              onChange={setInput}
              onSubmit={handleSend}
              isLoading={isLoading}
            />

            {/* Suggestions */}
            <AISuggestionGrid
  onSuggestionClick={handleSuggestionClick}
/>

            {/* Empty state */}
            <AIEmptyState />
          </>
        ) : (
          <>
            {/* Conversation */}
            <AIConversation
              messages={messages}
            />

            {/* Input */}
            <AIInput
              value={input}
              onChange={setInput}
              onSubmit={handleSend}
              isLoading={isLoading}
            />
          </>
        )}

      </div>
    </div>
  );
}