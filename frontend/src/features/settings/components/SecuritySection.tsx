import {
  KeyRound,
  ShieldCheck,
  MonitorSmartphone,
  LogOut,
  CheckCircle2,
} from "lucide-react";

import { useState } from "react";

export default function SecuritySection() {
  const [message, setMessage] = useState("");

  function handleAction(action: string) {
    setMessage(`${action} will be available once backend authentication is connected.`);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  return (
    <section className="mt-8 rounded-3xl border border-border bg-card p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Security
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Keep your Synapse account secure.
        </p>
      </div>

      {/* Feedback */}
      {message && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-[color:var(--synapse-accent-500)]/20 bg-[var(--synapse-accent-500)]/10 px-4 py-3 text-sm text-brand dark:text-brand">
          <CheckCircle2 size={17} />
          {message}
        </div>
      )}

      {/* Security options */}
      <div className="space-y-2">

        <SecurityRow
          icon={<KeyRound size={19} />}
          title="Password"
          description="Change your account password."
          action="Change"
          onClick={() => handleAction("Password management")}
        />

        <SecurityRow
          icon={<ShieldCheck size={19} />}
          title="Two-factor authentication"
          description="Add another layer of security to your account."
          action="Set up"
          onClick={() => handleAction("Two-factor authentication")}
        />

        <SecurityRow
          icon={<MonitorSmartphone size={19} />}
          title="Active sessions"
          description="Review the devices currently signed in to your account."
          action="Manage"
          onClick={() => handleAction("Session management")}
        />

        <SecurityRow
          icon={<LogOut size={19} />}
          title="Sign out of all devices"
          description="Sign out everywhere except this device."
          action="Sign out"
          danger
          onClick={() => handleAction("Sign out of all devices")}
        />

      </div>
    </section>
  );
}

interface SecurityRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  danger?: boolean;
  onClick: () => void;
}

function SecurityRow({
  icon,
  title,
  description,
  action,
  danger = false,
  onClick,
}: SecurityRowProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-transparent
        p-4
        transition
        hover:border-border
        hover:bg-muted/40
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

      {/* Action */}
      <button
        type="button"
        onClick={onClick}
        className={`
          shrink-0
          rounded-xl
          px-4
          py-2
          text-sm
          font-medium
          transition

          ${
            danger
              ? "text-red-600 hover:bg-red-500/10 dark:text-red-400"
              : "text-brand hover:bg-[var(--synapse-accent-500)]/10 dark:text-brand"
          }
        `}
      >
        {action}
      </button>
    </div>
  );
}