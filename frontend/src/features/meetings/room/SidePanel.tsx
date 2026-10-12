import { useEffect, useRef, useState } from "react";
import { Hand, Mic, MicOff, SendHorizontal, X } from "lucide-react";

import ProfileAvatar from "@/components/layout/UserMenu/ProfileAvatar";
import type { Tile } from "./ParticipantTile";
import type { RoomChatMessage } from "./useMeetingRoom";
import { formatClock } from "@/lib/format";
import { cn } from "@/lib/utils";

interface Props {
  tab: "chat" | "people";
  onTab: (tab: "chat" | "people") => void;
  onClose: () => void;
  tiles: Tile[];
  chat: RoomChatMessage[];
  onSend: (text: string) => void;
}

export default function SidePanel({ tab, onTab, onClose, tiles, chat, onSend }: Props) {
  const [text, setText] = useState("");
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({ block: "end" });
  }, [chat.length, tab]);

  const submit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <aside className="animate-slide-in fixed inset-0 z-50 flex flex-col bg-card text-card-foreground md:static md:z-auto md:w-[340px] md:shrink-0 md:rounded-xl md:border md:border-border md:m-2 md:ml-0">
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-border pl-2 pr-3">
        <div role="tablist" className="flex gap-1">
          {(["chat", "people"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => onTab(t)}
              className={cn(
                "h-8 rounded-lg px-3 text-sm font-medium capitalize",
                tab === t ? "bg-accent text-brand" : "text-muted-foreground hover:bg-muted",
              )}
            >
              {t === "people" ? `People (${tiles.length})` : "Chat"}
            </button>
          ))}
        </div>
        <button onClick={onClose} aria-label="Close panel" className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted">
          <X size={17} />
        </button>
      </div>

      {tab === "people" ? (
        <ul className="min-h-0 flex-1 space-y-0.5 overflow-y-auto p-2">
          {tiles.map((t) => (
            <li key={t.id} className="flex items-center gap-3 rounded-lg px-2 py-2">
              <ProfileAvatar name={t.name} size="sm" />
              <span className="min-w-0 flex-1 truncate text-sm font-medium">
                {t.name}{t.local ? " (You)" : ""}
              </span>
              {t.hand && <Hand size={15} className="text-spark" />}
              {t.micOn ? <Mic size={15} className="text-muted-foreground" /> : <MicOff size={15} className="text-live" />}
            </li>
          ))}
        </ul>
      ) : (
        <>
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
            {chat.length === 0 && (
              <p className="px-4 py-10 text-center text-sm text-muted-foreground">
                Messages here are only visible to people in this meeting, and disappear when it ends.
              </p>
            )}
            {chat.map((m) => (
              <div key={m.id} className={cn("flex flex-col", m.own ? "items-end" : "items-start")}>
                <p className="mb-0.5 text-xs text-muted-foreground">
                  {m.own ? "You" : m.name} · {formatClock(m.ts)}
                </p>
                <p className={cn(
                  "max-w-[85%] whitespace-pre-wrap break-words rounded-[12px] px-3 py-1.5 text-sm",
                  m.own ? "bg-[var(--synapse-accent-500)] text-white" : "bg-muted",
                )}>
                  {m.text}
                </p>
              </div>
            ))}
            <div ref={end} />
          </div>
          <div className="pb-safe flex shrink-0 items-center gap-2 border-t border-border p-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Message everyone"
              aria-label="Message everyone"
              className="h-10 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-[color:var(--synapse-accent-500)]"
            />
            <button
              onClick={submit}
              disabled={!text.trim()}
              aria-label="Send"
              className="flex size-10 items-center justify-center rounded-lg bg-[var(--synapse-accent-500)] text-white disabled:opacity-50"
            >
              <SendHorizontal size={17} />
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
