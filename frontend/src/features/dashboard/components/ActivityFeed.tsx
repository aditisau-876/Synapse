import {
  Clock3,
  Activity,
} from "lucide-react";

import { useDashboard } from "../hooks/useDashboard";

export default function ActivityFeed() {
  const { activities } = useDashboard();

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
      <div
        className="
          mb-6
          flex
          items-center
          gap-2
        "
      >
        <Activity
          size={20}
          className="
            text-[var(--synapse-accent-500)]

            dark:text-[var(--synapse-accent-500)]
          "
        />

        <h2
          className="
            text-xl
            font-bold
            text-slate-800

            dark:text-foreground
          "
        >
          Activity Feed
        </h2>
      </div>

      <div className="space-y-5">
        {activities.map((item) => (
          <div
            key={item.id}
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
            <h3
              className="
                font-semibold
                text-slate-800

                dark:text-foreground
              "
            >
              {item.title}
            </h3>

            <p
              className="
                mt-1
                text-sm
                text-slate-500

                dark:text-muted-foreground
              "
            >
              {item.description}
            </p>

            <div
              className="
                mt-3
                flex
                items-center
                gap-2
                text-xs
                text-[var(--synapse-accent-500)]

                dark:text-[var(--synapse-accent-500)]
              "
            >
              <Clock3 size={14} />

              {item.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}