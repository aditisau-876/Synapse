import {
  CalendarClock,
  Users,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useDashboard } from "../hooks/useDashboard";

export default function UpcomingMeetings() {
  const { meetings } = useDashboard();

  const navigate = useNavigate();

  return (
    <div
      className="
        rounded-3xl
        border
        border-[var(--synapse-accent-100)]
        bg-card
        p-6

        dark:border-white/10
        dark:bg-card
        dark:shadow-xl
      "
    >
      <h2
        className="
          mb-6
          text-xl
          font-bold
          text-slate-800

          dark:text-foreground
        "
      >
        Upcoming Meetings
      </h2>

      <div className="space-y-5">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="
              rounded-2xl
              border
              border-[var(--synapse-accent-100)]
              bg-[var(--synapse-accent-50)]/60
              p-4

              dark:border-white/5
              dark:bg-card/5
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <div>
                <h3
                  className="
                    font-semibold
                    text-slate-800

                    dark:text-foreground
                  "
                >
                  {meeting.title}
                </h3>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-4
                    text-sm
                    text-slate-500

                    dark:text-muted-foreground
                  "
                >
                  <span className="flex items-center gap-1">
                    <CalendarClock size={15} />
                    {meeting.time}
                  </span>

                  <span className="flex items-center gap-1">
                    <Users size={15} />
                    {meeting.participants}
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate("/app/meetings")
                }
                className="
                  rounded-xl
                  bg-[var(--synapse-accent-500)]
                  px-4
                  py-2
                  font-medium
                  text-white
                  transition
                  hover:bg-[var(--synapse-accent-700)]
                "
              >
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}