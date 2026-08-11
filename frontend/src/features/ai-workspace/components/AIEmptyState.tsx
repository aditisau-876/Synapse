import { Sparkles } from "lucide-react";

export default function AIEmptyState() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Sparkles size={26} />
      </div>

      <h3 className="mt-5 text-lg font-semibold">
        Start a conversation
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Ask Synapse AI to help with meetings, tasks, notes,
        planning, summaries, or anything you're working on.
      </p>
    </div>
  );
}