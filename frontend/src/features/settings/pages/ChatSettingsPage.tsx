import { useUserSettings } from "../hooks/useUserSettings";

export default function ChatSettingsPage() {
  const { settings, updateSetting } = useUserSettings();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">
          Chats
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Customize your chat experience.
        </p>
      </div>

      <div className="divide-y divide-border rounded-2xl border border-border bg-card">
        <SettingRow
          title="Enter to send"
          description="Press Enter to send messages instead of creating a new line."
          checked={settings.enterToSend}
          onChange={(value) =>
            updateSetting("enterToSend", value)
          }
        />

        <SettingRow
          title="Media auto-download"
          description="Automatically download images and media shared in chats."
          checked={settings.mediaAutoDownload}
          onChange={(value) =>
            updateSetting("mediaAutoDownload", value)
          }
        />

        <SettingRow
          title="Link previews"
          description="Show previews when someone shares a link."
          checked={settings.linkPreviews}
          onChange={(value) =>
            updateSetting("linkPreviews", value)
          }
        />

        <SettingRow
          title="Read receipts"
          description="Let others know when you have read their messages."
          checked={settings.readReceipts}
          onChange={(value) =>
            updateSetting("readReceipts", value)
          }
        />

        <SettingRow
          title="Typing indicators"
          description="Show when you are typing a message."
          checked={settings.typingIndicators}
          onChange={(value) =>
            updateSetting("typingIndicators", value)
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