import { HardDrive, Image, FileText } from "lucide-react";
import { useUserSettings } from "../hooks/useUserSettings";

export default function StorageSettingsPage() {
  const { settings, updateSetting } = useUserSettings();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">
          Storage & Data
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your storage and data usage.
        </p>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--synapse-accent-500)]/10 text-[var(--synapse-accent-500)]">
            <HardDrive size={22} />
          </div>

          <div>
            <h3 className="font-semibold">
              Storage Usage
            </h3>

            <p className="text-sm text-muted-foreground">
              2.4 GB of storage used
            </p>
          </div>
        </div>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--synapse-accent-500)] to-indigo-500"
            style={{ width: "24%" }}
          />
        </div>

        <p className="mt-2 text-right text-xs text-muted-foreground">
          24% used
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">
          Data Preferences
        </h3>

        <div className="divide-y divide-border rounded-2xl border border-border bg-card">
          <SettingRow
            title="Auto-download files"
            description="Automatically download files shared in conversations."
            checked={settings.autoDownloadFiles}
            onChange={(value) =>
              updateSetting("autoDownloadFiles", value)
            }
          />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <StorageCard
          icon={Image}
          title="Media"
          value="1.8 GB"
        />

        <StorageCard
          icon={FileText}
          title="Documents"
          value="620 MB"
        />
      </section>
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
          ${checked ? "bg-[var(--synapse-accent-500)]" : "bg-[var(--synapse-accent-500)]"}
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
            ${checked ? "left-6" : "left-1"}
          `}
        />
      </button>
    </div>
  );
}

function StorageCard({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof Image;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--synapse-accent-500)]/10 text-[var(--synapse-accent-500)]">
          <Icon size={19} />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <p className="font-semibold">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}