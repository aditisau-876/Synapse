import type { CSSProperties } from "react";
import type { Message } from "../../types/chat";
import ReadReceipt from "./ReadReceipt";
import { linkify } from "./linkify";
import { formatClock } from "@/lib/format";
import { hueFor } from "@/lib/people";
import { cn } from "@/lib/utils";

interface Props {
  message: Message;
  /** Show the sender's name above the text (first message of a run in a group). */
  showSender: boolean;
  /** Last message in a run gets the small "tail" corner. */
  lastInRun: boolean;
}

export default function MessageBubble({ message, showSender, lastInRun }: Props) {
  const { own } = message;

  return (
    <div className={cn("flex", own ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-[14px] px-3 py-1.5 sm:max-w-[70%]",
          own
            ? "bg-[var(--synapse-accent-500)] text-white"
            : "border border-border bg-card text-card-foreground",
          lastInRun && (own ? "rounded-br-[4px]" : "rounded-bl-[4px]"),
        )}
      >
        {showSender && (
          <p
            style={{ "--h": hueFor(message.sender.name) } as CSSProperties}
            className="mb-0.5 text-[13px] font-semibold text-[hsl(var(--h)_55%_34%)] dark:text-[hsl(var(--h)_65%_74%)]"
          >
            {message.sender.name}
          </p>
        )}
        <p className="whitespace-pre-wrap break-words text-[15px] leading-6">
          {linkify(message.text)}
          {/* Time floats to the bottom-right of the last line, WhatsApp-style. */}
          <span className="float-right ml-3 mt-2 inline-flex select-none items-center gap-1 text-[11px] leading-none opacity-70">
            {formatClock(message.createdAt)}
            {own && <ReadReceipt status={message.status} />}
          </span>
        </p>
      </div>
    </div>
  );
}
