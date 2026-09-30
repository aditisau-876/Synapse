import {
  CheckCheck,
  Eye,
  MessageCircle,
  CircleUserRound,
} from "lucide-react";

import { useUserSettings } from "../hooks/useUserSettings";

export default function PrivacySection() {
  const { settings, updateSetting } = useUserSettings();

  return (
    <section
      className="
        rounded-3xl
        border
        border-border
        bg-card
        p-6
      "
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Privacy
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Control what other people can see and how your
          conversations behave.
        </p>
      </div>

      {/* Settings */}
      <div className="space-y-2">
        <PrivacyRow
          icon={<CheckCheck size={19} />}
          title="Read receipts"
          description="Let people know when you have read their messages."
          enabled={settings.readReceipts}
          onChange={(value) =>
            updateSetting("readReceipts", value)
          }
        />

        <PrivacyRow
          icon={<MessageCircle size={19} />}
          title="Typing indicators"
          description="Show others when you are typing."
          enabled={settings.typingIndicators}
          onChange={(value) =>
            updateSetting("typingIndicators", value)
          }
        />

        <PrivacyRow
          icon={<CircleUserRound size={19} />}
          title="Online status"
          description="Allow others to see when you are online."
          enabled={settings.onlineStatus}
          onChange={(value) =>
            updateSetting("onlineStatus", value)
          }
        />

        <PrivacyRow
          icon={<Eye size={19} />}
          title="Message preview"
          description="Show message content in notification previews."
          enabled={settings.notificationPreview}
          onChange={(value) =>
            updateSetting("notificationPreview", value)
          }
        />
      </div>
    </section>
  );
}

interface PrivacyRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}

function PrivacyRow({
  icon,
  title,
  description,
  enabled,
  onChange,
}: PrivacyRowProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-border
        bg-background
        p-4
        transition-colors
        hover:bg-muted/50
      "
    >
      {/* Icon */}
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-muted
          text-muted-foreground
        "
      >
        {icon}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="font-medium">
          {title}
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Toggle */}
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`
          relative
          h-6
          w-11
          shrink-0
          rounded-full
          transition-colors
          ${
            enabled
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
              enabled
                ? "left-6"
                : "left-1"
            }
          `}
        />
      </button>
    </div>
  );
}