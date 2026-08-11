import { Sparkles } from "lucide-react";

interface Props {
  hasConversation?: boolean;
}

export default function AIHero({
  hasConversation = false,
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8">
      {/* Decorative glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-56
          w-56
          rounded-full
          bg-primary/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-16
          h-48
          w-48
          rounded-full
          bg-primary/5
          blur-3xl
        "
      />

      <div className="relative">
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-primary/10
              text-primary
            "
          >
            <Sparkles size={23} />
          </div>

          <div>
            <p className="text-sm font-medium text-primary">
              Synapse AI
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight">
              {hasConversation
                ? "Continue working with AI"
                : "What can I help you with?"}
            </h1>
          </div>
        </div>

        {!hasConversation && (
          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground">
            Ask questions, summarize meetings, organize tasks,
            brainstorm ideas, or get help with your workspace.
          </p>
        )}
      </div>
    </div>
  );
}