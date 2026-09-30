import { useUserSettings } from "../hooks/useUserSettings";

export default function MeetingSettingsPage() {
  const { settings, updateSetting } = useUserSettings();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">
          Calls & Meetings
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your meeting and calling preferences.
        </p>
      </div>

      <div className="divide-y divide-border rounded-2xl border border-border bg-card">
        <SettingRow
          title="Call notifications"
          description="Receive notifications for incoming calls and meetings."
          checked={settings.callNotifications}
          onChange={(value) =>
            updateSetting("callNotifications", value)
          }
        />

        <SettingRow
          title="Microphone on join"
          description="Automatically enable your microphone when joining a meeting."
          checked={settings.microphoneOnJoin}
          onChange={(value) =>
            updateSetting("microphoneOnJoin", value)
          }
        />

        <SettingRow
          title="Camera on join"
          description="Automatically enable your camera when joining a meeting."
          checked={settings.cameraOnJoin}
          onChange={(value) =>
            updateSetting("cameraOnJoin", value)
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
            bg-card
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