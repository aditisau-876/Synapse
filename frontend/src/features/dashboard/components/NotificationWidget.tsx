import {
  Bell,
} from "lucide-react";

export default function NotificationWidget() {
  const notifications = [
    "Alex mentioned you",
    "Meeting starts in 15 mins",
    "Sarah uploaded Dashboard.fig",
    "Emily completed Authentication",
  ];

  return (
    <div
      className="
        rounded-3xl
        border
        border-[var(--synapse-accent-200)]
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
        <Bell className="text-[var(--synapse-accent-500)]" />

        <h2 className="text-xl font-bold">
          Notifications
        </h2>
      </div>

      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="
              flex
              items-center
              gap-4
              rounded-2xl
              border
              border-[var(--synapse-accent-100)]
              bg-[var(--synapse-accent-50)]/60
              p-3
              transition
              hover:border-[var(--synapse-accent-500)]
              hover:bg-muted/70

              dark:border-white/5
              dark:bg-card/5
            "
          >
            {notification}
          </div>
        ))}
      </div>
    </div>
  );
}