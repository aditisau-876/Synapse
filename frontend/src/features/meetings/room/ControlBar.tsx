import { useEffect, useRef, useState } from "react";
import {
  Hand, Link2, MessageSquare, Mic, MicOff, MonitorUp, PhoneOff, Smile, Users, Video, VideoOff,
} from "lucide-react";

import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/utils";

const EMOJIS = ["👍", "👏", "❤️", "😂", "🎉", "😮"];

interface Props {
  title: string;
  code: string;
  startedAt: number;
  micOn: boolean;
  camOn: boolean;
  sharing: boolean;
  handRaised: boolean;
  hasMic: boolean;
  hasCam: boolean;
  panel: "chat" | "people" | null;
  peopleCount: number;
  unreadChat: number;
  onMic: () => void;
  onCam: () => void;
  onShare: () => void;
  onHand: () => void;
  onReact: (emoji: string) => void;
  onPanel: (panel: "chat" | "people") => void;
  onCopyLink: () => void;
  onLeave: () => void;
}

function RoundButton({
  label, onClick, active = false, danger = false, disabled = false, children, badge,
}: {
  label: string; onClick: () => void; active?: boolean; danger?: boolean; disabled?: boolean;
  children: React.ReactNode; badge?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={active || danger ? true : undefined}
      title={label}
      className={cn(
        "relative flex size-11 items-center justify-center rounded-full text-white transition-colors disabled:opacity-40 sm:size-12",
        danger ? "bg-live hover:bg-live/85"
          : active ? "bg-[var(--synapse-accent-500)] hover:bg-[var(--synapse-accent-600)]"
          : "bg-room-line hover:bg-white/20",
      )}
    >
      {children}
      {!!badge && (
        <span className="absolute -right-0.5 -top-0.5 flex min-w-4 items-center justify-center rounded-full bg-spark px-1 text-[10px] font-bold leading-4 text-black">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </button>
  );
}

export default function ControlBar(p: Props) {
  const [now, setNow] = useState(Date.now());
  const [emojiOpen, setEmojiOpen] = useState(false);
  const emojiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!emojiOpen) return;
    const close = (e: MouseEvent) => {
      if (!emojiRef.current?.contains(e.target as Node)) setEmojiOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [emojiOpen]);

  return (
    <footer className="pb-safe flex shrink-0 items-center justify-between gap-3 border-t border-room-line bg-room px-3 py-2.5 sm:px-5">
      {/* Left: what meeting is this */}
      <div className="hidden min-w-0 flex-1 md:block">
        <p className="truncate text-sm font-semibold">{p.title}</p>
        <p className="text-xs text-white/55 tabular-nums">
          {formatDuration((now - p.startedAt) / 1000)} · {p.code}
        </p>
      </div>

      {/* Centre: the controls */}
      <div className="mx-auto flex items-center gap-2 sm:gap-2.5 md:mx-0">
        <RoundButton label={p.micOn ? "Mute microphone" : "Unmute microphone"} onClick={p.onMic} danger={!p.micOn && p.hasMic} disabled={!p.hasMic}>
          {p.micOn ? <Mic size={20} /> : <MicOff size={20} />}
        </RoundButton>
        <RoundButton label={p.camOn ? "Turn camera off" : "Turn camera on"} onClick={p.onCam} danger={!p.camOn && p.hasCam} disabled={!p.hasCam}>
          {p.camOn ? <Video size={20} /> : <VideoOff size={20} />}
        </RoundButton>
        <span className="hidden sm:block">
          <RoundButton label={p.sharing ? "Stop presenting" : "Present your screen"} onClick={p.onShare} active={p.sharing}>
            <MonitorUp size={20} />
          </RoundButton>
        </span>
        <RoundButton label={p.handRaised ? "Lower hand" : "Raise hand"} onClick={p.onHand} active={p.handRaised}>
          <Hand size={20} />
        </RoundButton>

        <div ref={emojiRef} className="relative">
          <RoundButton label="Send a reaction" onClick={() => setEmojiOpen((v) => !v)} active={emojiOpen}>
            <Smile size={20} />
          </RoundButton>
          {emojiOpen && (
            <div className="animate-pop absolute bottom-14 left-1/2 flex -translate-x-1/2 gap-1 rounded-xl border border-room-line bg-room-tile p-1.5 shadow-2xl">
              {EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => { p.onReact(e); setEmojiOpen(false); }}
                  aria-label={`React ${e}`}
                  className="flex size-9 items-center justify-center rounded-lg text-xl hover:bg-white/10"
                >
                  {e}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={p.onLeave}
          aria-label="Leave meeting"
          title="Leave meeting"
          className="ml-1 flex h-11 items-center justify-center gap-2 rounded-full bg-live px-5 text-white transition-colors hover:bg-live/85 sm:h-12"
        >
          <PhoneOff size={20} />
        </button>
      </div>

      {/* Right: side panels */}
      <div className="hidden flex-1 items-center justify-end gap-2 md:flex">
        <RoundButton label="Copy invite link" onClick={p.onCopyLink}><Link2 size={19} /></RoundButton>
        <RoundButton label={`People (${p.peopleCount})`} onClick={() => p.onPanel("people")} active={p.panel === "people"}>
          <Users size={19} />
        </RoundButton>
        <RoundButton label="Chat" onClick={() => p.onPanel("chat")} active={p.panel === "chat"} badge={p.unreadChat}>
          <MessageSquare size={19} />
        </RoundButton>
      </div>

      {/* Phones: panels sit beside the leave button */}
      <div className="flex items-center gap-2 md:hidden">
        <RoundButton label="People" onClick={() => p.onPanel("people")} active={p.panel === "people"}><Users size={19} /></RoundButton>
        <RoundButton label="Chat" onClick={() => p.onPanel("chat")} active={p.panel === "chat"} badge={p.unreadChat}><MessageSquare size={19} /></RoundButton>
      </div>
    </footer>
  );
}
