import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WifiOff } from "lucide-react";
import { toast } from "sonner";

import PreJoin, { type JoinChoice } from "./PreJoin";
import VideoGrid from "./VideoGrid";
import ControlBar from "./ControlBar";
import SidePanel from "./SidePanel";
import type { Tile } from "./ParticipantTile";
import { useMeetingRoom } from "./useMeetingRoom";
import { getMeetingByCode, type RemoteMeeting } from "../services";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/errors";

type Phase =
  | { kind: "loading" }
  | { kind: "missing"; message: string }
  | { kind: "lobby"; meeting: RemoteMeeting }
  | { kind: "room"; meeting: RemoteMeeting; choice: JoinChoice };

export default function MeetingRoom() {
  const { code = "" } = useParams();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;
    setPhase({ kind: "loading" });
    getMeetingByCode(code)
      .then((meeting) => !cancelled && setPhase({ kind: "lobby", meeting }))
      .catch((error) => {
        if (!cancelled) {
          setPhase({
            kind: "missing",
            message: getErrorMessage(error, "We couldn't open this meeting."),
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [code]);

  if (phase.kind === "loading") {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-background text-sm text-muted-foreground">
        Opening meeting…
      </main>
    );
  }

  if (phase.kind === "missing") {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-background px-6 text-center">
        <h1 className="text-2xl font-bold">Can't open this meeting</h1>
        <p className="max-w-sm text-muted-foreground">{phase.message} Check the code and try again.</p>
        <Button onClick={() => navigate("/app/meetings")}>Back to meetings</Button>
      </main>
    );
  }

  if (phase.kind === "lobby") {
    return (
      <PreJoin
        title={phase.meeting.title}
        code={phase.meeting.code}
        onJoin={(choice) => setPhase({ kind: "room", meeting: phase.meeting, choice })}
      />
    );
  }

  return <Room meeting={phase.meeting} choice={phase.choice} />;
}

function Room({ meeting, choice }: { meeting: RemoteMeeting; choice: JoinChoice }) {
  const navigate = useNavigate();
  const startedAt = useRef(Date.now());
  const [panel, setPanel] = useState<"chat" | "people" | null>(null);
  const [seenChat, setSeenChat] = useState(0);

  const room = useMeetingRoom({
    code: meeting.code,
    name: choice.name,
    localStream: choice.stream,
    initialMic: choice.micOn,
    initialCam: choice.camOn,
  });

  // This component owns the camera: release it when the room really closes.
  // The deferred check keeps React StrictMode's mount/unmount/mount from stopping it in dev.
  const alive = useRef(false);
  useEffect(() => {
    alive.current = true;
    const stream = choice.stream;
    return () => {
      alive.current = false;
      setTimeout(() => {
        if (!alive.current) stream?.getTracks().forEach((t) => t.stop());
      }, 0);
    };
  }, [choice.stream]);

  const tiles = useMemo<Tile[]>(
    () => [
      {
        id: room.selfId, name: choice.name, stream: room.display, micOn: room.micOn,
        camOn: room.camOn, hand: room.handRaised, sharing: room.sharing, local: true,
      },
      ...room.participants.map((p) => ({ ...p, local: false })),
    ],
    [room.selfId, room.display, room.micOn, room.camOn, room.handRaised, room.sharing, room.participants, choice.name],
  );

  const unread = panel === "chat" ? 0 : Math.max(0, room.chat.filter((m) => !m.own).length - seenChat);
  useEffect(() => {
    if (panel === "chat") setSeenChat(room.chat.filter((m) => !m.own).length);
  }, [panel, room.chat]);

  const togglePanel = (p: "chat" | "people") => setPanel((cur) => (cur === p ? null : p));

  const copyLink = async () => {
    const link = `${window.location.origin}/app/meetings/${meeting.code}`;
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Invite link copied");
    } catch {
      toast.error(`Couldn't copy automatically. Share this link: ${link}`);
    }
  };

  return (
    // `dark` makes every semantic token (card, border, muted…) dark inside the room.
    <div className="dark flex h-dvh flex-col bg-room text-room-foreground">
      {room.connection !== "connected" && (
        <div role="alert" className="flex items-center justify-center gap-3 bg-spark px-4 py-2 text-sm font-medium text-black">
          <WifiOff size={16} />
          {room.connection === "connecting" && "Connecting…"}
          {room.connection === "lost" && (
            <>
              Connection lost.
              <button onClick={room.rejoin} className="underline">Rejoin</button>
            </>
          )}
          {room.connection === "denied" && "You can't join this meeting. Sign in again and retry."}
        </div>
      )}

      <div className="relative flex min-h-0 flex-1">
        <main className="relative min-w-0 flex-1">
          <VideoGrid tiles={tiles} />

          {tiles.length === 1 && room.connection === "connected" && (
            <p className="pointer-events-none absolute inset-x-0 top-4 text-center text-sm text-white/70">
              You're the only one here. Copy the invite link to bring someone in.
            </p>
          )}

          {/* Reactions float up from the bottom centre. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-4 h-0">
            {room.reactions.map((r, i) => (
              <span
                key={r.id}
                className="animate-float-up absolute text-4xl"
                style={{ left: `${30 + ((i * 17) % 40)}%` }}
                title={r.name}
              >
                {r.emoji}
              </span>
            ))}
          </div>
        </main>

        {panel && (
          <SidePanel
            tab={panel}
            onTab={setPanel}
            onClose={() => setPanel(null)}
            tiles={tiles}
            chat={room.chat}
            onSend={room.sendChat}
          />
        )}
      </div>

      <ControlBar
        title={meeting.title}
        code={meeting.code}
        startedAt={startedAt.current}
        micOn={room.micOn}
        camOn={room.camOn}
        sharing={room.sharing}
        handRaised={room.handRaised}
        hasMic={!!choice.stream?.getAudioTracks().length}
        hasCam={!!choice.stream?.getVideoTracks().length}
        panel={panel}
        peopleCount={tiles.length}
        unreadChat={unread}
        onMic={room.toggleMic}
        onCam={room.toggleCam}
        onShare={() => void room.toggleShare()}
        onHand={room.toggleHand}
        onReact={room.sendReaction}
        onPanel={togglePanel}
        onCopyLink={() => void copyLink()}
        onLeave={() => navigate("/app/meetings")}
      />
    </div>
  );
}
