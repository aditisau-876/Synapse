import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, KeyRound, MessageSquarePlus, Video } from "lucide-react";
import { toast } from "sonner";

import MeetingCard from "@/features/meetings/components/MeetingCard";
import ProfileAvatar from "@/components/layout/UserMenu/ProfileAvatar";
import { Button } from "@/components/ui/button";
import { getMeetings, instantMeeting, type RemoteMeeting } from "@/features/meetings/services";
import { useChatSync } from "@/features/chat/hooks/useChat";
import { useChatStore } from "@/features/chat/store/chat-store";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { getErrorMessage } from "@/lib/errors";
import { listTimestamp, parseDate } from "@/lib/format";
import { firstName } from "@/lib/people";

const HOUR = 3_600_000;

function greeting() {
  const h = new Date().getHours();
  return h < 5 ? "Working late" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

function startOf(m: RemoteMeeting) {
  return parseDate(m.start_at ?? `${m.date}T${m.time}:00Z`)?.getTime() ?? 0;
}

function Section({ title, to, linkLabel, children }: { title: string; to: string; linkLabel: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-2 flex items-baseline justify-between px-1">
        <h2 className="text-sm font-semibold text-muted-foreground">{title}</h2>
        <Link to={to} className="flex items-center gap-1 text-sm font-medium text-brand hover:underline">
          {linkLabel} <ArrowRight size={14} />
        </Link>
      </div>
      {children}
    </section>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  useChatSync();
  const conversations = useChatStore((s) => s.conversations);
  const chatSource = useChatStore((s) => s.source);
  const setConversation = useChatStore((s) => s.setConversation);
  const { tasks } = useTasks();

  const [meetings, setMeetings] = useState<RemoteMeeting[] | null>(null);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getMeetings()
      .then((m) => !cancelled && setMeetings(m))
      .catch(() => !cancelled && setMeetings([]));
    return () => {
      cancelled = true;
    };
  }, []);

  const upNext = useMemo(() => {
    const now = Date.now();
    return (meetings ?? [])
      .filter((m) => startOf(m) > now - HOUR && (m.status !== "live" || now - startOf(m) < 3 * HOUR))
      .sort((a, b) => startOf(a) - startOf(b))
      .slice(0, 3);
  }, [meetings]);

  const openTasks = useMemo(
    () => tasks.filter((t) => t.status !== "done").sort((a, b) => (a.dueDate || "9").localeCompare(b.dueDate || "9")),
    [tasks],
  );

  const meetNow = async () => {
    setStarting(true);
    try {
      const m = await instantMeeting();
      navigate(`/app/meetings/${m.code}`);
    } catch (error) {
      toast.error(getErrorMessage(error, "Couldn't start a meeting."));
      setStarting(false);
    }
  };

  const today = new Date().toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-6 sm:px-6 sm:py-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{today}</p>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
            {greeting()}, {firstName(user?.name)}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => void meetNow()} disabled={starting}><Video /> {starting ? "Starting…" : "New meeting"}</Button>
          <Button variant="outline" onClick={() => navigate("/app/meetings?join=1")}><KeyRound /> Join with code</Button>
          <Button variant="outline" onClick={() => navigate("/app/chats")}><MessageSquarePlus /> Chats</Button>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="space-y-8 lg:col-span-3">
          <Section title="Up next" to="/app/meetings" linkLabel="All meetings">
            {meetings === null ? (
              <div className="h-20 animate-pulse rounded-xl bg-muted" />
            ) : upNext.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
                Nothing scheduled. Start a meeting now, or plan one from the Meetings page.
              </p>
            ) : (
              <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
                {upNext.map((m) => (
                  <MeetingCard key={m.id} meeting={m} live={m.status === "live"} joinSoon={startOf(m) - Date.now() < 15 * 60_000} />
                ))}
              </ul>
            )}
          </Section>

          <Section title="Open tasks" to="/app/tasks" linkLabel="Board">
            {openTasks.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
                You're all caught up.
              </p>
            ) : (
              <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
                {openTasks.slice(0, 5).map((t) => (
                  <li key={t.id}>
                    <Link to="/app/tasks" className="flex items-center gap-3 px-4 py-3 hover:bg-muted/60">
                      <span
                        className={`size-2 shrink-0 rounded-full ${t.priority === "High" ? "bg-live" : t.priority === "Medium" ? "bg-spark" : "bg-muted-foreground/50"}`}
                        title={`${t.priority} priority`}
                      />
                      <span className="min-w-0 flex-1 truncate text-sm font-medium">{t.title}</span>
                      {t.dueDate && <span className="shrink-0 text-xs text-muted-foreground">{t.dueDate}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </div>

        <div className="lg:col-span-2">
          <Section title="Recent chats" to="/app/chats" linkLabel="Open chats">
            {chatSource === "loading" ? (
              <div className="h-32 animate-pulse rounded-xl bg-muted" />
            ) : conversations.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
                No conversations yet. Find someone by name or email in Chats.
              </p>
            ) : (
              <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
                {conversations.slice(0, 5).map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => { setConversation(c.id); navigate("/app/chats"); }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted/60"
                    >
                      <ProfileAvatar name={c.name} group={c.type === "group"} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">{c.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">{c.lastMessage || "Encrypted conversation"}</span>
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">{listTimestamp(c.lastMessageTime)}</span>
                      {c.unreadCount > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-spark px-1.5 text-[11px] font-bold text-black">{c.unreadCount}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
}
