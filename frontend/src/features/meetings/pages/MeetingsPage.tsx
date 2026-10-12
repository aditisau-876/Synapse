import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { CalendarPlus, KeyRound, Video, X } from "lucide-react";
import { toast } from "sonner";

import MeetingCard from "../components/MeetingCard";
import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { getMeetings, createMeeting, instantMeeting, type RemoteMeeting } from "../services";
import { getErrorMessage } from "@/lib/errors";
import { localInputValue, parseDate } from "@/lib/format";

const HOUR = 3_600_000;

function startOf(m: RemoteMeeting) {
  return parseDate(m.start_at ?? `${m.date}T${m.time}:00Z`)?.getTime() ?? 0;
}

/** Accepts "ABCD1234", "abcd 1234" or a pasted invite link. */
function extractCode(input: string) {
  const fromLink = input.match(/meetings\/([A-Za-z0-9]+)/)?.[1];
  return (fromLink ?? input).replace(/[^A-Za-z0-9]/g, "").toUpperCase();
}

const field =
  "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-[color:var(--synapse-accent-500)] focus:ring-2 focus:ring-[color:var(--synapse-accent-500)]/25";

export default function MeetingsPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const [meetings, setMeetings] = useState<RemoteMeeting[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [starting, setStarting] = useState(false);

  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(() => localInputValue(60));
  const [scheduling, setScheduling] = useState(false);

  const joinOpen = params.get("join") === "1";
  const [joinInput, setJoinInput] = useState("");

  const load = useCallback(async () => {
    setState("loading");
    try {
      setMeetings(await getMeetings());
      setState("ready");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  const groups = useMemo(() => {
    const now = Date.now();
    const live: RemoteMeeting[] = [];
    const upcoming: RemoteMeeting[] = [];
    const earlier: RemoteMeeting[] = [];
    for (const m of meetings) {
      const at = startOf(m);
      if (m.status === "live" && now - at < 3 * HOUR) live.push(m);
      else if (at > now - HOUR) upcoming.push(m);
      else earlier.push(m);
    }
    upcoming.sort((a, b) => startOf(a) - startOf(b));
    earlier.sort((a, b) => startOf(b) - startOf(a));
    return { live, upcoming, earlier: earlier.slice(0, 10) };
  }, [meetings]);

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

  const schedule = async () => {
    if (!title.trim()) return toast.error("Give the meeting a title.");
    const at = new Date(start);
    if (Number.isNaN(at.getTime())) return toast.error("Choose a start date and time.");
    setScheduling(true);
    try {
      const m = await createMeeting(title.trim(), at.toISOString());
      setMeetings((x) => [...x, m]);
      setScheduleOpen(false);
      setTitle("");
      setStart(localInputValue(60));
      toast.success("Meeting scheduled", {
        action: {
          label: "Copy invite link",
          onClick: () => void navigator.clipboard?.writeText(`${window.location.origin}/app/meetings/${m.code}`),
        },
      });
    } catch (error) {
      toast.error(getErrorMessage(error, "Couldn't schedule the meeting."));
    } finally {
      setScheduling(false);
    }
  };

  const closeJoin = () => {
    setParams((p) => {
      p.delete("join");
      return p;
    });
    setJoinInput("");
  };

  const join = () => {
    const code = extractCode(joinInput);
    if (code.length < 4) return toast.error("Enter the meeting code or paste the invite link.");
    navigate(`/app/meetings/${code}`);
  };

  const section = (label: string, list: RemoteMeeting[], opts: { live?: boolean }) =>
    list.length > 0 && (
      <section>
        <h2 className="mb-2 px-1 text-sm font-semibold text-muted-foreground">{label}</h2>
        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {list.map((m) => (
            <MeetingCard
              key={m.id}
              meeting={m}
              live={!!opts.live}
              joinSoon={!opts.live && startOf(m) - Date.now() < 15 * 60_000 && startOf(m) > Date.now() - HOUR}
            />
          ))}
        </ul>
      </section>
    );

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Meetings</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Start a call, join with a code, or plan one ahead.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setParams({ join: "1" })}>
            <KeyRound /> Join with code
          </Button>
          <Button variant="outline" onClick={() => setScheduleOpen(true)}>
            <CalendarPlus /> Schedule
          </Button>
          <Button onClick={() => void meetNow()} disabled={starting}>
            <Video /> {starting ? "Starting…" : "New meeting"}
          </Button>
        </div>
      </header>

      {state === "loading" && (
        <div className="space-y-px overflow-hidden rounded-xl border border-border bg-card" aria-label="Loading meetings">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-4">
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-1/3 animate-pulse rounded bg-muted" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
              </div>
              <div className="h-9 w-16 animate-pulse rounded-lg bg-muted" />
            </div>
          ))}
        </div>
      )}

      {state === "error" && (
        <div role="alert" className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm">
          <span>Couldn't load your meetings. Check your connection.</span>
          <Button variant="outline" onClick={() => void load()}>Try again</Button>
        </div>
      )}

      {state === "ready" && meetings.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-card">
          <EmptyState
            icon={Video}
            title="No meetings yet"
            description="Start one now and share the link, or schedule a time that suits everyone."
            buttonText="Start a meeting"
            onAction={() => void meetNow()}
          />
        </div>
      )}

      {state === "ready" && (
        <div className="space-y-6">
          {section("Live now", groups.live, { live: true })}
          {section("Upcoming", groups.upcoming, {})}
          {section("Earlier", groups.earlier, {})}
        </div>
      )}

      {/* Schedule */}
      <Dialog.Root open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="animate-fade fixed inset-0 z-[70] bg-black/50" />
          <Dialog.Content className="animate-pop fixed left-1/2 top-[14vh] z-[71] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-border bg-popover p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <Dialog.Title className="font-display text-lg font-semibold">Schedule a meeting</Dialog.Title>
              <Dialog.Close aria-label="Close" className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"><X size={17} /></Dialog.Close>
            </div>
            <Dialog.Description className="mt-1 text-sm text-muted-foreground">
              You'll get an invite link to share with anyone.
            </Dialog.Description>
            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="m-title" className="mb-1.5 block text-sm font-medium">Title</label>
                <input id="m-title" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Weekly sync" maxLength={200} className={field} />
              </div>
              <div>
                <label htmlFor="m-start" className="mb-1.5 block text-sm font-medium">Starts</label>
                <input id="m-start" type="datetime-local" value={start} min={localInputValue(0)} onChange={(e) => setStart(e.target.value)} className={field} />
              </div>
              <Button size="lg" className="w-full" disabled={scheduling} onClick={() => void schedule()}>
                {scheduling ? "Scheduling…" : "Schedule meeting"}
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Join */}
      <Dialog.Root open={joinOpen} onOpenChange={(o) => !o && closeJoin()}>
        <Dialog.Portal>
          <Dialog.Overlay className="animate-fade fixed inset-0 z-[70] bg-black/50" />
          <Dialog.Content className="animate-pop fixed left-1/2 top-[14vh] z-[71] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-border bg-popover p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <Dialog.Title className="font-display text-lg font-semibold">Join a meeting</Dialog.Title>
              <Dialog.Close aria-label="Close" className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"><X size={17} /></Dialog.Close>
            </div>
            <Dialog.Description className="mt-1 text-sm text-muted-foreground">
              Enter the code you were given, or paste the invite link.
            </Dialog.Description>
            <div className="mt-5 space-y-4">
              <input
                autoFocus
                value={joinInput}
                onChange={(e) => setJoinInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && join()}
                placeholder="Meeting code or link"
                aria-label="Meeting code or link"
                className={field}
              />
              <Button size="lg" className="w-full" onClick={join}>Continue</Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
