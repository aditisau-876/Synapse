import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/store/auth-store";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

/** STUN only by default. For people behind strict NATs add a TURN server via VITE_ICE_SERVERS (JSON). */
function iceServers(): RTCIceServer[] {
  try {
    const raw = import.meta.env.VITE_ICE_SERVERS;
    if (raw) return JSON.parse(raw) as RTCIceServer[];
  } catch {
    /* fall through to the default */
  }
  return [{ urls: "stun:stun.l.google.com:19302" }];
}

export interface Participant {
  id: string;
  name: string;
  stream: MediaStream | null;
  micOn: boolean;
  camOn: boolean;
  hand: boolean;
  sharing: boolean;
}

export interface RoomChatMessage {
  id: string;
  clientId: string;
  name: string;
  text: string;
  ts: number;
  own: boolean;
}

export interface FloatingReaction {
  id: string;
  emoji: string;
  name: string;
}

export type ConnectionState = "connecting" | "connected" | "lost" | "denied";

interface Options {
  code: string;
  name: string;
  localStream: MediaStream | null;
  initialMic: boolean;
  initialCam: boolean;
}

interface Signal {
  type: string;
  clientId: string;
  target?: string;
  name?: string;
  sdp?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidateInit;
  micOn?: boolean;
  camOn?: boolean;
  hand?: boolean;
  sharing?: boolean;
  id?: string;
  text?: string;
  ts?: number;
  emoji?: string;
}

const blank = (id: string): Participant => ({
  id, name: "Guest", stream: null, micOn: true, camOn: true, hand: false, sharing: false,
});

/**
 * Full-mesh WebRTC. Every participant keeps one RTCPeerConnection per other
 * participant; the existing WebSocket relay carries signaling AND the small
 * room messages (chat, hand, reactions, mute state).
 *
 * Who offers: the person who just joined announces "join"; everyone already in
 * the room creates the connection and sends the offer. That avoids "glare"
 * (both sides offering at once) without any coordination.
 */
export function useMeetingRoom({ code, name, localStream, initialMic, initialCam }: Options) {
  const selfId = useRef(crypto.randomUUID());
  const ws = useRef<WebSocket | null>(null);
  const peers = useRef(new Map<string, RTCPeerConnection>());
  const remoteStreams = useRef(new Map<string, MediaStream>());
  const pendingIce = useRef(new Map<string, RTCIceCandidateInit[]>());
  const screen = useRef<MediaStream | null>(null);
  const mine = useRef({ micOn: initialMic, camOn: initialCam, hand: false, sharing: false });

  const [participants, setParticipants] = useState<Record<string, Participant>>({});
  const [connection, setConnection] = useState<ConnectionState>("connecting");
  const [micOn, setMicOn] = useState(initialMic);
  const [camOn, setCamOn] = useState(initialCam);
  const [sharing, setSharing] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [chat, setChat] = useState<RoomChatMessage[]>([]);
  const [reactions, setReactions] = useState<FloatingReaction[]>([]);
  const [display, setDisplay] = useState<MediaStream | null>(localStream);
  const [attempt, setAttempt] = useState(0);

  const send = useCallback((msg: Omit<Signal, "clientId">) => {
    const socket = ws.current;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ ...msg, clientId: selfId.current }));
    }
  }, []);

  const broadcastState = useCallback(() => {
    send({ type: "state", name, ...mine.current });
  }, [send, name]);

  const patch = useCallback((id: string, changes: Partial<Participant>) => {
    setParticipants((prev) => ({ ...prev, [id]: { ...(prev[id] ?? blank(id)), ...changes } }));
  }, []);

  const addReaction = useCallback((emoji: string, who: string) => {
    const id = crypto.randomUUID();
    setReactions((r) => [...r, { id, emoji, name: who }]);
    setTimeout(() => setReactions((r) => r.filter((x) => x.id !== id)), 2900);
  }, []);

  useEffect(() => {
    let closing = false;

    const dropPeer = (id: string, removeTile = true) => {
      peers.current.get(id)?.close();
      peers.current.delete(id);
      pendingIce.current.delete(id);
      remoteStreams.current.delete(id);
      if (removeTile) {
        setParticipants((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      }
    };

    const createPeer = (remoteId: string) => {
      const pc = new RTCPeerConnection({ iceServers: iceServers() });
      peers.current.set(remoteId, pc);

      const audio = localStream?.getAudioTracks()[0];
      const camera = localStream?.getVideoTracks()[0];
      const video = screen.current?.getVideoTracks()[0] ?? camera;
      // A transceiver with no track still lets us receive, and lets us attach a
      // track later (screen share) without renegotiating.
      if (audio && localStream) pc.addTrack(audio, localStream);
      else pc.addTransceiver("audio", { direction: "sendrecv" });
      if (video && localStream) pc.addTrack(video, localStream);
      else pc.addTransceiver("video", { direction: "sendrecv" });

      pc.onicecandidate = (e) => {
        if (e.candidate) send({ type: "ice", target: remoteId, candidate: e.candidate.toJSON() });
      };
      pc.ontrack = (e) => {
        const stream = remoteStreams.current.get(remoteId) ?? new MediaStream();
        if (!stream.getTracks().includes(e.track)) stream.addTrack(e.track);
        remoteStreams.current.set(remoteId, stream);
        patch(remoteId, { stream });
      };
      pc.onconnectionstatechange = () => {
        if (pc.connectionState === "failed" || pc.connectionState === "closed") dropPeer(remoteId);
      };
      return pc;
    };

    const flushIce = async (id: string, pc: RTCPeerConnection) => {
      const queued = pendingIce.current.get(id) ?? [];
      pendingIce.current.delete(id);
      for (const c of queued) await pc.addIceCandidate(c).catch(() => undefined);
    };

    const handle = async (msg: Signal) => {
      if (msg.clientId === selfId.current) return;
      if (msg.target && msg.target !== selfId.current) return;
      const id = msg.clientId;

      switch (msg.type) {
        case "join": {
          patch(id, { name: msg.name || "Guest" });
          toast(`${msg.name || "Someone"} joined`);
          dropPeer(id, false); // a rejoin replaces the old connection
          const pc = createPeer(id);
          send({ type: "hello", target: id, name, ...mine.current });
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          send({ type: "offer", target: id, sdp: pc.localDescription ?? offer });
          break;
        }
        case "hello":
        case "state":
          patch(id, {
            name: msg.name || "Guest",
            micOn: msg.micOn ?? true,
            camOn: msg.camOn ?? true,
            hand: msg.hand ?? false,
            sharing: msg.sharing ?? false,
          });
          break;
        case "offer": {
          const pc = peers.current.get(id) ?? createPeer(id);
          if (msg.sdp) await pc.setRemoteDescription(msg.sdp);
          await flushIce(id, pc);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          send({ type: "answer", target: id, sdp: pc.localDescription ?? answer });
          break;
        }
        case "answer": {
          const pc = peers.current.get(id);
          if (pc && msg.sdp) {
            await pc.setRemoteDescription(msg.sdp);
            await flushIce(id, pc);
          }
          break;
        }
        case "ice": {
          const pc = peers.current.get(id);
          if (!msg.candidate) break;
          if (pc?.remoteDescription) await pc.addIceCandidate(msg.candidate).catch(() => undefined);
          else pendingIce.current.set(id, [...(pendingIce.current.get(id) ?? []), msg.candidate]);
          break;
        }
        case "chat":
          setChat((c) => [
            ...c,
            { id: msg.id ?? crypto.randomUUID(), clientId: id, name: msg.name || "Guest", text: msg.text ?? "", ts: msg.ts ?? Date.now(), own: false },
          ]);
          break;
        case "reaction":
          addReaction(msg.emoji ?? "👍", msg.name || "Guest");
          break;
        case "leave":
          dropPeer(id);
          break;
      }
    };

    const token = useAuthStore.getState().accessToken ?? "";
    const url = `${API.replace(/^http/, "ws")}/meetings/ws/${encodeURIComponent(code)}?token=${encodeURIComponent(token)}`;
    const socket = new WebSocket(url);
    ws.current = socket;
    setConnection("connecting");

    socket.onopen = () => {
      setConnection("connected");
      send({ type: "join", name });
    };
    socket.onmessage = (event) => {
      try {
        void handle(JSON.parse(event.data) as Signal).catch(() => undefined);
      } catch {
        /* ignore malformed frames */
      }
    };
    socket.onclose = (event) => {
      if (closing) return;
      setConnection(event.code === 1008 || event.code === 4401 ? "denied" : "lost");
    };

    const peerMap = peers.current;
    return () => {
      closing = true;
      send({ type: "leave" });
      socket.close();
      peerMap.forEach((pc) => pc.close());
      peerMap.clear();
      remoteStreams.current.clear();
      pendingIce.current.clear();
      screen.current?.getTracks().forEach((t) => t.stop());
      screen.current = null;
      setParticipants({});
    };
  }, [code, attempt, name, localStream, send, patch, addReaction]);

  const toggleMic = () => {
    const next = !micOn;
    localStream?.getAudioTracks().forEach((t) => (t.enabled = next));
    mine.current.micOn = next;
    setMicOn(next);
    broadcastState();
  };

  const toggleCam = () => {
    const next = !camOn;
    localStream?.getVideoTracks().forEach((t) => (t.enabled = next));
    mine.current.camOn = next;
    setCamOn(next);
    broadcastState();
  };

  const swapVideoTrack = async (track: MediaStreamTrack | null) => {
    for (const pc of peers.current.values()) {
      const sender = pc.getTransceivers().find((t) => t.receiver.track.kind === "video")?.sender;
      await sender?.replaceTrack(track).catch(() => undefined);
    }
  };

  const stopSharing = async () => {
    screen.current?.getTracks().forEach((t) => t.stop());
    screen.current = null;
    await swapVideoTrack(localStream?.getVideoTracks()[0] ?? null);
    mine.current.sharing = false;
    setSharing(false);
    setDisplay(localStream);
    broadcastState();
  };

  const toggleShare = async () => {
    if (sharing) return stopSharing();
    if (!navigator.mediaDevices?.getDisplayMedia) {
      toast.error("Screen sharing isn't available in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const track = stream.getVideoTracks()[0];
      screen.current = stream;
      track.onended = () => void stopSharing(); // the browser's own "Stop sharing" button
      await swapVideoTrack(track);
      mine.current.sharing = true;
      setSharing(true);
      setDisplay(stream);
      broadcastState();
    } catch {
      /* the person closed the picker: nothing to report */
    }
  };

  const toggleHand = () => {
    const next = !handRaised;
    mine.current.hand = next;
    setHandRaised(next);
    broadcastState();
  };

  const sendChat = (text: string) => {
    const value = text.trim();
    if (!value) return;
    const msg: RoomChatMessage = { id: crypto.randomUUID(), clientId: selfId.current, name, text: value, ts: Date.now(), own: true };
    setChat((c) => [...c, msg]);
    send({ type: "chat", id: msg.id, name, text: value, ts: msg.ts });
  };

  const sendReaction = (emoji: string) => {
    addReaction(emoji, "You");
    send({ type: "reaction", name, emoji });
  };

  return {
    selfId: selfId.current,
    connection,
    participants: Object.values(participants),
    micOn, camOn, sharing, handRaised, display,
    chat, reactions,
    toggleMic, toggleCam, toggleShare, toggleHand, sendChat, sendReaction,
    rejoin: () => setAttempt((a) => a + 1),
  };
}
