import { useUserSettings } from "../hooks/useUserSettings";

export default function NotificationSettingsPage() {
  const { settings, updateSetting } = useUserSettings();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">
          Notifications
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage how Synapse keeps you informed.
        </p>
      </div>

      <div className="divide-y divide-border rounded-2xl border border-border bg-card">
        <SettingRow
          title="Email notifications"
          description="Receive important updates and activity by email."
          checked={settings.emailNotifications}
          onChange={(value) =>
            updateSetting("emailNotifications", value)
          }
        />

        <SettingRow
          title="Desktop notifications"
          description="Show notifications on your desktop."
          checked={settings.desktopNotifications}
          onChange={(value) =>
            updateSetting("desktopNotifications", value)
          }
        />

        <SettingRow
          title="Message notifications"
          description="Get notified when someone sends you a message."
          checked={settings.messageNotifications}
          onChange={(value) =>
            updateSetting("messageNotifications", value)
          }
        />

        <SettingRow
          title="Meeting notifications"
          description="Receive reminders about upcoming meetings."
          checked={settings.meetingNotifications}
          onChange={(value) =>
            updateSetting("meetingNotifications", value)
          }
        />

        <SettingRow
          title="Notification sounds"
          description="Play a sound when a new notification arrives."
          checked={settings.soundNotifications}
          onChange={(value) =>
            updateSetting("soundNotifications", value)
          }
        />

        <SettingRow
          title="Notification preview"
          description="Show message content in notifications."
          checked={settings.notificationPreview}
          onChange={(value) =>
            updateSetting("notificationPreview", value)
          }
        />
      </div>
    </div>
  );
}

interface SettingRowProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

function SettingRow({
  title,
  description,
  checked,
  onChange,
}: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-6 p-5">
      <div>
        <h3 className="font-medium">
          {title}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative
          h-6
          w-11
          shrink-0
          rounded-full
          transition-colors
          ${
            checked
              ? "bg-[var(--synapse-accent-500)]"
              : "bg-[var(--synapse-accent-500)]"
          }
        `}
      >
        <span
          className={`
            absolute
            top-1/2
            h-4
            w-4
            -translate-y-1/2
            rounded-full
            bg-white
            shadow-sm
            transition-transform
            ${
              checked
                ? "left-6"
                : "left-1"
            }
          `}
        />
      </button>
    </div>
  );
}