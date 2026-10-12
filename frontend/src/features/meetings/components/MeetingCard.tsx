import { useNavigate } from "react-router-dom";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { RemoteMeeting } from "../services";
import { formatWhen } from "@/lib/format";

interface Props {
  meeting: RemoteMeeting;
  live: boolean;
  joinSoon: boolean;
}

/** One meeting as a row in a list: scannable, with the one action that matters. */
export default function MeetingCard({ meeting, live, joinSoon }: Props) {
  const navigate = useNavigate();
  const when = formatWhen(meeting.start_at ?? `${meeting.date}T${meeting.time}:00Z`);

  const copy = async () => {
    const link = `${window.location.origin}/app/meetings/${meeting.code}`;
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Invite link copied");
    } catch {
      toast.error(`Couldn't copy automatically. Share this link: ${link}`);
    }
  };

  return (
    <li className="flex items-center gap-3 px-4 py-3.5 sm:gap-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-[15px] font-semibold">{meeting.title}</h3>
          {live && (
            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-live/10 px-2 py-0.5 text-xs font-semibold text-live">
              <span className="size-1.5 rounded-full bg-live" />
              Live
            </span>
          )}
        </div>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">
          {live ? "Started " : ""}{when} · Hosted by {meeting.host} · Code {meeting.code}
        </p>
      </div>

      <button
        type="button"
        onClick={() => void copy()}
        aria-label={`Copy invite link for ${meeting.title}`}
        title="Copy invite link"
        className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <Copy size={16} />
      </button>
      <Button
        variant={live || joinSoon ? "default" : "outline"}
        onClick={() => navigate(`/app/meetings/${meeting.code}`)}
      >
        Join
      </Button>
    </li>
  );
}
