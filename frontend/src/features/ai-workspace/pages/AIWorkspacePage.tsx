import { useState } from "react";

import AIWorkspaceHeader from "../components/AIWorkspaceHeader";
import AIHero from "../components/AIHero";
import AIInput from "../components/AIInput";
import AISuggestionGrid from "../components/AISuggestionGrid";
import AIConversation from "../components/AIConversation";
import AIEmptyState from "../components/AIEmptyState";
import AIHistory, { type AIHistoryItem } from "../components/AIHistory";
import AISummaryViewer from "../components/AISummaryViewer";

import { useAIWorkspace } from "../hooks/useAIWorkspace";

export default function AIWorkspacePage() {
  const {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
  } = useAIWorkspace();

  const [selectedSummary, setSelectedSummary] =
    useState<AIHistoryItem | null>(null);

  const hasConversation = messages.length > 0;

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    await sendMessage(input);
  };

  const handleSuggestionClick = (prompt: string) => {
    setInput(prompt);
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto w-full max-w-[1350px] space-y-7 px-5 py-6 lg:px-8 lg:py-8">
        <AIWorkspaceHeader />

        {selectedSummary ? (
          <AISummaryViewer
            title={selectedSummary.title}
            type={selectedSummary.type}
            date={selectedSummary.createdAt}
            summary={selectedSummary.preview}
            keyPoints={[
              "Key decisions and discussion points are captured by Synapse AI.",
              "Important context is retained only for the configured retention period.",
            ]}
            actionItems={[
              "Review the generated summary before sharing it.",
              "Save a PDF if you need to retain it after the 7-day window.",
            ]}
            onBack={() => setSelectedSummary(null)}
            onDownload={handleDownload}
          />
        ) : (
          <>
            <AIHero hasConversation={hasConversation} />

            {hasConversation ? (
              <AIConversation messages={messages} />
            ) : (
              <>
                <AIInput
                  value={input}
                  onChange={setInput}
                  onSubmit={handleSend}
                  isLoading={isLoading}
                />

                <AISuggestionGrid
                  onSuggestionClick={handleSuggestionClick}
                />

                <AIEmptyState />
              </>
            )}

            {hasConversation && (
              <AIInput
                value={input}
                onChange={setInput}
                onSubmit={handleSend}
                isLoading={isLoading}
              />
            )}

            {!hasConversation && (
              <AIHistory
                onOpen={setSelectedSummary}
                onDownload={handleDownload}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
