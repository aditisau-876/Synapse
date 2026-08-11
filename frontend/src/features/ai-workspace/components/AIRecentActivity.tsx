import {
  Clock3,
  MessageSquare,
  Sparkles,
} from "lucide-react";

interface Activity {
  id: string;
  title: string;
  preview: string;
  time: string;
}

interface Props {
  activities: Activity[];
  onSelect?: (activity: Activity) => void;
}

export default function AIRecentActivity({
  activities,
  onSelect,
}: Props) {
  if (activities.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Recent activity
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Continue one of your recent AI conversations.
          </p>
        </div>

        <Sparkles
          size={18}
          className="text-primary"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {activities.map((activity) => (
          <button
            key={activity.id}
            type="button"
            onClick={() => onSelect?.(activity)}
            className="
              group
              flex
              items-start
              gap-4
              rounded-2xl
              border
              border-border
              bg-card
              p-4
              text-left
              transition-all
              duration-200
              hover:border-primary/40
              hover:bg-primary/5
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-primary/10
                text-primary
                transition-colors
                group-hover:bg-primary
                group-hover:text-primary-foreground
              "
            >
              <MessageSquare size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">
                {activity.title}
              </p>

              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {activity.preview}
              </p>

              <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock3 size={13} />
                <span>{activity.time}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}