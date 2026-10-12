import { History, Sparkles } from "lucide-react";

import AIHistoryCard from "./AIHistoryCard";

export interface AIHistoryItem {
  id: string;
  title: string;
  type:
    | "Meeting Summary"
    | "Task Summary"
    | "Chat Summary"
    | "Document Summary";
  preview: string;
  createdAt: string;
  expiresAt: string;
  daysRemaining: number;
}

interface Props {
  items?: AIHistoryItem[];
  onOpen?: (item: AIHistoryItem) => void;
  onDownload?: (item: AIHistoryItem) => void;
}

const demoHistory: AIHistoryItem[] = [
  {
    id: "1",
    title: "Project Planning Meeting",
    type: "Meeting Summary",
    preview:
      "Discussed the upcoming release, assigned responsibilities and finalized the development timeline.",
    createdAt: "Today",
    expiresAt: "6 days",
    daysRemaining: 6,
  },
  {
    id: "2",
    title: "Weekly Team Standup",
    type: "Meeting Summary",
    preview:
      "Reviewed completed tasks, current blockers and priorities for the next sprint.",
    createdAt: "Yesterday",
    expiresAt: "5 days",
    daysRemaining: 5,
  },
  {
    id: "3",
    title: "Frontend Tasks Summary",
    type: "Task Summary",
    preview:
      "Summarized the current frontend tasks and highlighted items requiring attention.",
    createdAt: "2 days ago",
    expiresAt: "4 days",
    daysRemaining: 4,
  },
];

export default function AIHistory({
  items = demoHistory,
  onOpen,
  onDownload,
}: Props) {
  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-[var(--synapse-accent-500)]/10
            text-brand
          "
        >
          <History size={21} />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            AI History
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Your recent AI-generated summaries and
            conversations.
          </p>
        </div>
      </div>

      {/* Retention notice */}
      <div
        className="
          flex
          gap-3
          rounded-2xl
          border
          border-[color:var(--synapse-accent-500)]/20
          bg-[var(--synapse-accent-500)]/5
          p-4
        "
      >
        <Sparkles
          size={18}
          className="
            mt-0.5
            shrink-0
            text-brand
          "
        />

        <div>
          <p className="text-sm font-medium">
            Available for 7 days
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            AI-generated history is automatically removed
            from Synapse after 7 days. Download important
            summaries as PDF to keep them on your device.
          </p>
        </div>
      </div>

      {/* History */}
      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item) => (
            <AIHistoryCard
              key={item.id}
              item={item}
              onOpen={() => onOpen?.(item)}
              onDownload={() => onDownload?.(item)}
            />
          ))}
        </div>
      ) : (
        <div
          className="
            rounded-3xl
            border
            border-border
            bg-card
            p-10
            text-center
          "
        >
          <History
            size={30}
            className="mx-auto text-muted-foreground"
          />

          <p className="mt-4 font-medium">
            No recent AI history
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Your AI-generated summaries will appear here.
          </p>
        </div>
      )}
    </section>
  );
}