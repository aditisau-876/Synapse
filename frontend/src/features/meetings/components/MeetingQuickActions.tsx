import {
  CalendarPlus,
  Video,
  Link2,
} from "lucide-react";

export default function MeetingQuickActions() {
  return (

    <div
      className="
      mt-10
      grid
      gap-6
      md:grid-cols-3
      "
    >

      <button
        className="
        rounded-3xl
        bg-[var(--synapse-accent-500)]
        p-8
        text-left
        text-white
        shadow-xl
        "
      >

        <Video className="mb-5"/>

        <h3 className="text-xl font-bold">
          Instant Meeting
        </h3>

        <p className="mt-2 text-white/80">
          Start a meeting now.
        </p>

      </button>

      <button
        className="
        rounded-3xl
        border
        border-border
        bg-background/70
        p-8
        text-left
        backdrop-blur-xl
        "
      >

        <CalendarPlus className="mb-5 text-brand"/>

        <h3 className="text-xl font-bold">
          Schedule
        </h3>

        <p className="mt-2 text-muted-foreground">
          Plan your meetings.
        </p>

      </button>

      <button
        className="
        rounded-3xl
        border
        border-border
        bg-background/70
        p-8
        text-left
        backdrop-blur-xl
        "
      >

        <Link2 className="mb-5 text-cyan-500"/>

        <h3 className="text-xl font-bold">
          Join via Link
        </h3>

        <p className="mt-2 text-muted-foreground">
          Enter meeting code.
        </p>

      </button>

    </div>

  );
}