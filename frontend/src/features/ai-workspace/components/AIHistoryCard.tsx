import {
  CalendarDays,
  Download,
  FileText,
  MessageSquare,
  NotebookPen,
  Video,
} from "lucide-react";

import type { AIHistoryItem } from "./AIHistory";

interface Props {
  item: AIHistoryItem;
  onOpen?: () => void;
  onDownload?: () => void;
}

export default function AIHistoryCard({
  item,
  onOpen,
  onDownload,
}: Props) {
  const icon = item.type === "Meeting Summary" ? <Video size={20} /> : item.type === "Task Summary" ? <NotebookPen size={20} /> : item.type === "Chat Summary" ? <MessageSquare size={20} /> : <FileText size={20} />;

  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-border
        bg-card
        p-5
        transition-all
        duration-200
        hover:border-[var(--synapse-accent-500)]/40
        hover:shadow-lg
      "
    >
      <div className="flex gap-4">
        {/* Icon */}
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
            text-[var(--synapse-accent-500)]
          "
        >
          {icon}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold">
                {item.title}
              </p>

              <p className="mt-1 text-xs font-medium text-[var(--synapse-accent-500)]">
                {item.type}
              </p>
            </div>

            <span
              className={`
                rounded-full
                px-2.5
                py-1
                text-xs
                font-medium

                ${
                  item.daysRemaining <= 1
                    ? "bg-red-500/10 text-red-600 dark:text-red-400"
                    : "bg-muted text-muted-foreground"
                }
              `}
            >
              {item.daysRemaining === 1
                ? "Expires tomorrow"
                : `Expires in ${item.daysRemaining} days`}
            </span>
          </div>

          <p
            className="
              mt-3
              line-clamp-2
              text-sm
              leading-6
              text-muted-foreground
            "
          >
            {item.preview}
          </p>

          {/* Meta */}
          <div
            className="
              mt-4
              flex
              flex-wrap
              items-center
              gap-4
              text-xs
              text-muted-foreground
            "
          >
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} />
              {item.createdAt}
            </span>

            <span>
              Available for {item.expiresAt}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={onOpen}
              className="
                rounded-xl
                bg-[var(--synapse-accent-500)]
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:opacity-90
              "
            >
              Open summary
            </button>

            <button
              type="button"
              onClick={onDownload}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-border
                px-4
                py-2
                text-sm
                font-medium
                text-muted-foreground
                transition
                hover:bg-muted
                hover:text-foreground
              "
            >
              <Download size={15} />
              Save PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}