import { Bell, MessageCircle, Video } from "lucide-react";
import { relativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AppNotification } from "@/store/notification-store";

const icons = { message: MessageCircle, meeting: Video, system: Bell } as const;

export default function NotificationItem({ notification }: { notification: AppNotification }) {
  const Icon = icons[notification.kind];
  return (
    <div className="flex w-full items-start gap-3 rounded-lg px-2.5 py-2 text-left">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon size={16} />
      </span>
      <span className="min-w-0 flex-1">
        <span className={cn("block truncate text-sm", !notification.read && "font-semibold")}>
          {notification.title}
        </span>
        <span className="block truncate text-xs text-muted-foreground">{notification.body}</span>
        <span className="mt-0.5 block text-[11px] text-muted-foreground">
          {relativeTime(notification.createdAt)}
        </span>
      </span>
      {!notification.read && <span className="mt-2 size-2 shrink-0 rounded-full bg-spark" />}
    </div>
  );
}
