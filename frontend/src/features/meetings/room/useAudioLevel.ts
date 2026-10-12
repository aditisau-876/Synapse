import { useEffect, useState } from "react";

/** True while the stream's audio is above a speaking threshold (with a short hold to avoid flicker). */
export function useSpeaking(stream: MediaStream | null, enabled: boolean) {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!stream || !enabled || stream.getAudioTracks().length === 0) {
      setSpeaking(false);
      return;
    }
    let ctx: AudioContext;
    try {
      ctx = new AudioContext();
    } catch {
      return;
    }
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    let lastLoud = 0;

    const timer = setInterval(() => {
      analyser.getByteFrequencyData(data);
      let sum = 0;
      for (const v of data) sum += v;
      const level = sum / data.length;
      const now = Date.now();
      if (level > 14) lastLoud = now;
      setSpeaking(now - lastLoud < 600);
    }, 150);

    return () => {
      clearInterval(timer);
      source.disconnect();
      void ctx.close();
    };
  }, [stream, enabled]);

  return speaking;
}
