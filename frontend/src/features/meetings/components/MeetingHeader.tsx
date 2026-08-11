import { Plus } from "lucide-react";

export default function MeetingHeader() {
  return (
    <div className="flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-black">
          Meetings
        </h1>

        <p className="text-muted-foreground">
          Schedule, join and manage meetings.
        </p>

      </div>

      <div className="flex gap-3">

        <button
          className="
          rounded-xl
          border
          border-border
          px-5
          py-3
          hover:bg-muted
          "
        >
          Join Meeting
        </button>

        <button
          className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-[var(--synapse-accent-900)]
          to-indigo-500
          px-5
          py-3
          text-white
          shadow-lg
          "
        >
          <Plus size={18} />
          New Meeting
        </button>

      </div>

    </div>
  );
}