import { useEffect, useRef } from "react";
import { Hand, MicOff, Monitor } from "lucide-react";

import ProfileAvatar from "@/components/layout/UserMenu/ProfileAvatar";
import { useSpeaking } from "./useAudioLevel";
import { cn } from "@/lib/utils";

export interface Tile {
  id: string;
  name: string;
  stream: MediaStream | null;
  micOn: boolean;
  camOn: boolean;
  hand: boolean;
  sharing: boolean;
  local: boolean;
}

interface Props {
  tile: Tile;
  /** Smaller type and avatar for the filmstrip. */
  compact?: boolean;
  className?: string;
}

export default function ParticipantTile({ tile, compact = false, className }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const { stream, local, sharing, camOn, micOn, name, hand } = tile;

  useEffect(() => {
    if (video.current && video.current.srcObject !== stream) video.current.srcObject = stream;
  }, [stream]);

  const hasVideo = !!stream && stream.getVideoTracks().length > 0;
  const showVideo = hasVideo && (sharing || camOn);
  const speaking = useSpeaking(local ? null : stream, micOn);
  const localSpeaking = useSpeaking(local ? stream : null, micOn && !sharing);
  const active = speaking || localSpeaking;

  return (
    <div
      className={cn(
        "relative min-h-0 overflow-hidden rounded-xl bg-room-tile transition-shadow",
        active && "ring-2 ring-[color:var(--synapse-accent-300)]",
        className,
      )}
    >
      {/* Always mounted: it also plays the remote audio when the camera is off. */}
      <video
        ref={video}
        autoPlay
        playsInline
        muted={local}
        className={cn(
          "absolute inset-0 size-full",
          sharing ? "object-contain bg-black" : "object-cover",
          local && !sharing && "-scale-x-100",
          !showVideo && "opacity-0",
        )}
      />

      {!showVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <ProfileAvatar name={name} size={compact ? "md" : "xl"} />
        </div>
      )}

      {hand && (
        <span className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-spark px-1.5 py-1 text-xs font-semibold text-black">
          <Hand size={13} /> {compact ? "" : "Hand raised"}
        </span>
      )}

      <div className="absolute bottom-2 left-2 flex max-w-[calc(100%-1rem)] items-center gap-1.5 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
        {sharing && <Monitor size={12} />}
        {!micOn && <MicOff size={12} className="text-red-400" />}
        <span className="truncate">{local ? `${name} (You)` : name}{sharing ? " · presenting" : ""}</span>
      </div>
    </div>
  );
}
