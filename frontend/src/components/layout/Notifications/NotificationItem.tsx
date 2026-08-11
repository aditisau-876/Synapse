import {
  Bell,
  MessageCircle,
  Calendar,
  FileText,
} from "lucide-react";

interface Props {
  notification: {
    type: string;
    title: string;
    description: string;
    time: string;
    unread: boolean;
  };
}

export default function NotificationItem({
  notification,
}: Props) {
  function getIcon() {
    switch (notification.type) {
      case "message":
        return <MessageCircle size={18} />;
      case "meeting":
        return <Calendar size={18} />;
      case "file":
        return <FileText size={18} />;
      default:
        return <Bell size={18} />;
    }
  }

  return (
    <button
      className="
      flex
      w-full
      gap-4
      rounded-xl
      p-4
      text-left
      transition
      hover:bg-muted
      "
    >
      <div
        className="
        mt-1
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        bg-[var(--synapse-accent-500)]/10
        text-[var(--synapse-accent-500)]
        "
      >
        {getIcon()}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">

          <h4 className="font-semibold">
            {notification.title}
          </h4>

          {notification.unread && (
            <div className="h-2 w-2 rounded-full bg-blue-500" />
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          {notification.description}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {notification.time}
        </p>
      </div>
    </button>
  );
}