import { Hand, Mic, MonitorUp, PhoneOff, Video } from "lucide-react";
import ProfileAvatar from "@/components/layout/UserMenu/ProfileAvatar";

/**
 * Not a screenshot: a small, honest sketch of the product. A message in the
 * chat carries a "Join" chip, and a thread of light runs from it into the call.
 * The thread is the idea behind the name (a signal crossing a synapse).
 */
export default function ProductComposite() {
  return (
    <div className="relative mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-[1fr_1.25fr] lg:gap-0">
      {/* The signal, drawn once on load. Desktop only. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 500"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-10 hidden size-full lg:block"
      >
        <path
          id="thread"
          d="M 330 292 C 430 292, 400 150, 520 150"
          fill="none"
          stroke="var(--synapse-accent-500)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 7"
          vectorEffect="non-scaling-stroke"
        />
        <circle r="6" fill="var(--synapse-accent-secondary)">
          <animateMotion dur="2.2s" begin="0.8s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1">
            <mpath href="#thread" />
          </animateMotion>
        </circle>
      </svg>

      {/* Chat */}
      <div className="relative z-20 overflow-hidden rounded-2xl border border-border bg-card shadow-lg lg:mr-[-2rem]">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <ProfileAvatar name="Meera Das" online size="sm" />
          <div>
            <p className="text-sm font-semibold leading-tight">Meera Das</p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <div className="space-y-2 bg-background px-4 py-4 text-[14px]">
          <p className="max-w-[80%] rounded-[12px] rounded-bl-[4px] border border-border bg-card px-3 py-2">
            Can we go through the launch checklist before 4?
          </p>
          <p className="ml-auto max-w-[80%] rounded-[12px] bg-[var(--synapse-accent-500)] px-3 py-2 text-white">
            Yes. Easier to talk it through. Starting a call.
          </p>
          <div className="ml-auto flex max-w-[80%] items-center gap-3 rounded-[12px] rounded-br-[4px] bg-[var(--synapse-accent-500)] px-3 py-2.5 text-white">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/20">
              <Video size={16} />
            </span>
            <span className="leading-tight">
              <span className="block text-[13px] font-semibold">Launch checklist</span>
              <span className="block text-xs text-white/75">Video call · Join</span>
            </span>
          </div>
        </div>
      </div>

      {/* Meeting */}
      <div className="dark relative z-0 overflow-hidden rounded-2xl border border-room-line bg-room text-room-foreground shadow-xl lg:pl-8">
        <div className="grid grid-cols-2 gap-2 p-3">
          {[
            { n: "Meera Das", speaking: true },
            { n: "You" },
            { n: "Arjun Sen" },
            { n: "Tanvi Roy", hand: true },
          ].map((p) => (
            <div
              key={p.n}
              className={`relative flex aspect-video items-center justify-center rounded-xl bg-room-tile ${p.speaking ? "ring-2 ring-[color:var(--synapse-accent-300)]" : ""}`}
            >
              <ProfileAvatar name={p.n} size="lg" />
              {p.hand && (
                <span className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-spark px-1.5 py-0.5 text-[11px] font-semibold text-black">
                  <Hand size={11} />
                </span>
              )}
              <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[11px] font-medium text-white">
                {p.n}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 border-t border-room-line px-3 py-3">
          {[Mic, Video, MonitorUp].map((Icon, i) => (
            <span key={i} className="flex size-9 items-center justify-center rounded-full bg-room-line"><Icon size={16} /></span>
          ))}
          <span className="flex h-9 items-center rounded-full bg-live px-4"><PhoneOff size={16} /></span>
        </div>
      </div>
    </div>
  );
}
