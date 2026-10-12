import { useLayoutEffect, useMemo, useRef } from "react";
import { Lock } from "lucide-react";

import MessageBubble from "./MessageBubble";
import DateDivider from "./DateDivider";
import { useChat } from "../../hooks/useChat";
import { dayLabel, isSameDay, parseDate } from "@/lib/format";

const RUN_GAP_MS = 5 * 60_000;

export default function MessageList() {
  const { messages, conversation } = useChat();
  const scroller = useRef<HTMLDivElement>(null);
  const stick = useRef(true);
  const lastConversation = useRef<string | undefined>(undefined);

  // Build dividers and message "runs" (same sender, close in time).
  const rows = useMemo(() => {
    const out: Array<
      | { kind: "day"; key: string; label: string }
      | { kind: "msg"; key: string; message: (typeof messages)[number]; showSender: boolean; lastInRun: boolean }
    > = [];
    messages.forEach((m, i) => {
      const date = parseDate(m.createdAt);
      const prev = messages[i - 1];
      const next = messages[i + 1];
      const prevDate = prev ? parseDate(prev.createdAt) : null;
      const nextDate = next ? parseDate(next.createdAt) : null;

      if (date && (!prevDate || !isSameDay(date, prevDate))) {
        out.push({ kind: "day", key: `d-${m.id}`, label: dayLabel(date) });
      }
      const continuesPrev =
        !!prev && !!date && !!prevDate && prev.sender.id === m.sender.id &&
        isSameDay(date, prevDate) && date.getTime() - prevDate.getTime() < RUN_GAP_MS;
      const continuesNext =
        !!next && !!date && !!nextDate && next.sender.id === m.sender.id &&
        isSameDay(date, nextDate) && nextDate.getTime() - date.getTime() < RUN_GAP_MS;

      out.push({
        kind: "msg",
        key: m.id,
        message: m,
        showSender: conversation?.type === "group" && !m.own && !continuesPrev,
        lastInRun: !continuesNext,
      });
    });
    return out;
  }, [messages, conversation?.type]);

  // Follow new messages, unless the reader scrolled up to read history.
  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const switched = lastConversation.current !== conversation?.id;
    lastConversation.current = conversation?.id;
    const lastIsOwn = messages[messages.length - 1]?.own;
    if (switched || stick.current || lastIsOwn) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, conversation?.id]);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
  };

  return (
    <div
      ref={scroller}
      onScroll={onScroll}
      role="log"
      aria-live="polite"
      aria-label={`Messages with ${conversation?.name ?? ""}`}
      className="min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:px-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col">
        <div className="mx-auto mb-3 flex max-w-sm items-center gap-2 rounded-lg bg-muted px-3 py-2 text-center text-xs text-muted-foreground">
          <Lock size={13} className="shrink-0" />
          Messages are end-to-end encrypted. Only you and the people in this chat can read them.
        </div>

        {messages.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No messages yet. Say hello to {conversation?.name}.
          </p>
        )}

        {rows.map((row, i) => {
          if (row.kind === "day") return <DateDivider key={row.key} label={row.label} />;
          const prev = rows[i - 1];
          // Tighter spacing inside a run, looser between runs.
          const tight = prev?.kind === "msg" && !prev.lastInRun;
          return (
            <div key={row.key} className={tight ? "mt-0.5" : "mt-2.5"}>
              <MessageBubble
                message={row.message}
                showSender={row.showSender}
                lastInRun={row.lastInRun}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
