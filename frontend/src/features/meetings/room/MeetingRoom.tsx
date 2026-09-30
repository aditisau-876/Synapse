import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Copy, Wifi } from "lucide-react";
import { toast } from "sonner";
import { getMeetingByCode } from "../services";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function MeetingRoom() {
  const { code = "" } = useParams();
  const navigate = useNavigate();
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const pc = useRef<RTCPeerConnection | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const clientId = useRef(crypto.randomUUID());
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const [connected, setConnected] = useState(false);
  const [title, setTitle] = useState("Synapse Meeting");

  useEffect(() => {
    let cancelled = false;
    let localStream: MediaStream | null = null;
    const start = async () => {
      try {
        const meeting = await getMeetingByCode(code);
        if (!cancelled) setTitle(meeting.title);
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (cancelled) return;
        setStream(localStream);
        if (localVideo.current) localVideo.current.srcObject = localStream;
        const connection = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
        pc.current = connection;
        localStream.getTracks().forEach((track) => connection.addTrack(track, localStream!));
        connection.ontrack = (event) => { if (remoteVideo.current) remoteVideo.current.srcObject = event.streams[0]; };
        const wsUrl = API.replace(/^http/, "ws") + `/meetings/ws/${encodeURIComponent(code)}`;
        const socket = new WebSocket(wsUrl); ws.current = socket;
        socket.onopen = () => { setConnected(true); socket.send(JSON.stringify({ type: "join", clientId: clientId.current })); };
        socket.onclose = () => setConnected(false);
        connection.onicecandidate = (event) => { if (event.candidate && socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ type: "ice", clientId: clientId.current, candidate: event.candidate })); };
        socket.onmessage = async (event) => {
          const msg = JSON.parse(event.data);
          if (msg.clientId === clientId.current) return;
          if (msg.type === "join") {
            if (clientId.current < msg.clientId) {
              const offer = await connection.createOffer(); await connection.setLocalDescription(offer);
              socket.send(JSON.stringify({ type: "offer", clientId: clientId.current, target: msg.clientId, sdp: offer }));
            }
          } else if (msg.type === "offer" && (!msg.target || msg.target === clientId.current)) {
            await connection.setRemoteDescription(msg.sdp); const answer = await connection.createAnswer(); await connection.setLocalDescription(answer); socket.send(JSON.stringify({ type: "answer", clientId: clientId.current, target: msg.clientId, sdp: answer }));
          } else if (msg.type === "answer" && (!msg.target || msg.target === clientId.current)) {
            await connection.setRemoteDescription(msg.sdp);
          } else if (msg.type === "ice" && msg.candidate) {
            try { await connection.addIceCandidate(msg.candidate); } catch { /* stale candidate */ }
          }
        };
      } catch (error) { if (!cancelled) toast.error(error instanceof Error ? error.message : "Unable to join meeting"); }
    };
    void start();
    return () => { cancelled = true; ws.current?.close(); pc.current?.close(); localStream?.getTracks().forEach((t) => t.stop()); };
  }, [code]);

  const toggleMic = () => { stream?.getAudioTracks().forEach((t) => t.enabled = !mic); setMic((v) => !v); };
  const toggleCamera = () => { stream?.getVideoTracks().forEach((t) => t.enabled = !camera); setCamera((v) => !v); };
  return <div className="flex h-screen flex-col bg-slate-950 text-white"><header className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div><h1 className="font-semibold">{title}</h1><p className="text-xs text-white/50">Code: {code} · {connected ? "Connected" : "Connecting..."}</p></div><div className="flex items-center gap-2 text-xs text-white/60"><Wifi size={15}/>{connected ? "Signaling connected" : "Connecting"}</div></header><main className="relative grid flex-1 place-items-center p-5"><div className="grid h-full w-full max-w-6xl gap-4 md:grid-cols-2"><div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black"><video ref={localVideo} autoPlay muted playsInline className="h-full min-h-[280px] w-full object-cover"/><span className="absolute bottom-4 left-4 rounded-lg bg-black/50 px-3 py-1 text-sm">You</span></div><div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900"><video ref={remoteVideo} autoPlay playsInline className="h-full min-h-[280px] w-full object-cover"/><span className="absolute bottom-4 left-4 rounded-lg bg-black/50 px-3 py-1 text-sm">Participant</span></div></div></main><footer className="flex items-center justify-center gap-3 border-t border-white/10 p-5"><button onClick={toggleMic} className="rounded-full bg-white/10 p-4 hover:bg-white/20">{mic ? <Mic/> : <MicOff/>}</button><button onClick={toggleCamera} className="rounded-full bg-white/10 p-4 hover:bg-white/20">{camera ? <Video/> : <VideoOff/>}</button><button onClick={() => { void navigator.clipboard?.writeText(code); toast.success("Meeting code copied"); }} className="rounded-full bg-white/10 p-4 hover:bg-white/20"><Copy/></button><button onClick={() => navigate("/app/meetings")} className="rounded-full bg-red-600 p-4 hover:bg-red-500"><PhoneOff/></button></footer></div>;
}
