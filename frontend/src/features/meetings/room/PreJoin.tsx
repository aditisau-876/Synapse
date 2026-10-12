import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

import ProfileAvatar from "@/components/layout/UserMenu/ProfileAvatar";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/landing/Logo";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useUserSettings } from "@/features/settings/hooks/useUserSettings";
import { cn } from "@/lib/utils";

export interface JoinChoice {
  stream: MediaStream | null;
  name: string;
  micOn: boolean;
  camOn: boolean;
}

interface Props {
  title: string;
  code: string;
  onJoin: (choice: JoinChoice) => void;
}

/** Check your camera and mic before anyone sees you. */
export default function PreJoin({ title, code, onJoin }: Props) {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { settings } = useUserSettings();

  const video = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const joined = useRef(false);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [micOn, setMicOn] = useState(settings.microphoneOnJoin);
  const [camOn, setCamOn] = useState(settings.cameraOnJoin);
  const [name, setName] = useState(user?.name ?? "");
  const [problem, setProblem] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const attempts: MediaStreamConstraints[] = [
        { audio: true, video: true },
        { audio: true, video: false },
        { audio: false, video: true },
      ];
      for (const constraints of attempts) {
        try {
          const s = await navigator.mediaDevices.getUserMedia(constraints);
          if (cancelled) return s.getTracks().forEach((t) => t.stop());
          s.getAudioTracks().forEach((t) => (t.enabled = settings.microphoneOnJoin));
          s.getVideoTracks().forEach((t) => (t.enabled = settings.cameraOnJoin));
          streamRef.current = s;
          setStream(s);
          if (!constraints.video) setProblem("No camera found or camera access is blocked. You can still join with audio.");
          else if (!constraints.audio) setProblem("Microphone access is blocked. You can still join and listen.");
          return;
        } catch {
          /* try the next combination */
        }
      }
      if (!cancelled) {
        setProblem("Synapse can't use your camera or microphone. Allow access in the address bar to be seen and heard, or join to watch and listen.");
      }
    })();
    return () => {
      cancelled = true;
      // If we're not entering the room, release the camera light.
      if (!joined.current) streamRef.current?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (video.current) video.current.srcObject = stream;
  }, [stream]);

  const hasMic = !!stream?.getAudioTracks().length;
  const hasCam = !!stream?.getVideoTracks().length;

  const toggleMic = () => {
    const next = !micOn;
    stream?.getAudioTracks().forEach((t) => (t.enabled = next));
    setMicOn(next);
  };
  const toggleCam = () => {
    const next = !camOn;
    stream?.getVideoTracks().forEach((t) => (t.enabled = next));
    setCamOn(next);
  };

  const join = () => {
    joined.current = true;
    onJoin({ stream, name: name.trim() || "Guest", micOn: micOn && hasMic, camOn: camOn && hasCam });
  };

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4 py-8">
      <div className="grid w-full max-w-4xl items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-room">
            <video
              ref={video}
              autoPlay
              muted
              playsInline
              className={cn("absolute inset-0 size-full -scale-x-100 object-cover", !(camOn && hasCam) && "opacity-0")}
            />
            {!(camOn && hasCam) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <ProfileAvatar name={name || "You"} size="xl" />
              </div>
            )}
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-3">
              <button
                type="button" onClick={toggleMic} disabled={!hasMic}
                aria-label={micOn ? "Turn microphone off" : "Turn microphone on"}
                className={cn("flex size-11 items-center justify-center rounded-full text-white disabled:opacity-40", micOn && hasMic ? "bg-white/20 hover:bg-white/30" : "bg-live")}
              >
                {micOn && hasMic ? <Mic size={19} /> : <MicOff size={19} />}
              </button>
              <button
                type="button" onClick={toggleCam} disabled={!hasCam}
                aria-label={camOn ? "Turn camera off" : "Turn camera on"}
                className={cn("flex size-11 items-center justify-center rounded-full text-white disabled:opacity-40", camOn && hasCam ? "bg-white/20 hover:bg-white/30" : "bg-live")}
              >
                {camOn && hasCam ? <Video size={19} /> : <VideoOff size={19} />}
              </button>
            </div>
          </div>
          {problem && <p role="status" className="mt-3 text-sm text-muted-foreground">{problem}</p>}
        </div>

        <div>
          <LogoMark className="mb-5 size-9" />
          <h1 className="text-3xl font-bold">Ready to join?</h1>
          <p className="mt-2 text-muted-foreground">
            <span className="font-medium text-foreground">{title}</span>
            <span className="block text-sm">Meeting code {code}</span>
          </p>

          <label className="mt-6 block text-sm font-medium" htmlFor="display-name">Your name in the meeting</label>
          <input
            id="display-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && join()}
            maxLength={60}
            className="mt-1.5 h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-[color:var(--synapse-accent-500)] focus:ring-2 focus:ring-[color:var(--synapse-accent-500)]/25"
          />

          <div className="mt-6 flex gap-2">
            <Button size="lg" onClick={join} className="flex-1">Join now</Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/app/meetings")}>Cancel</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
