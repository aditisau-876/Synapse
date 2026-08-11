import {
  Monitor,
  Smartphone,
  Laptop,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { useState } from "react";

const sessions = [
  {
    id: 1,
    device: "Windows PC",
    browser: "Microsoft Edge",
    location: "Current device",
    lastActive: "Active now",
    icon: Monitor,
    current: true,
  },
  {
    id: 2,
    device: "Android Phone",
    browser: "Chrome",
    location: "India",
    lastActive: "2 hours ago",
    icon: Smartphone,
    current: false,
  },
  {
    id: 3,
    device: "MacBook",
    browser: "Safari",
    location: "India",
    lastActive: "Yesterday",
    icon: Laptop,
    current: false,
  },
];

export default function SessionsSettingsPage() {
  const [message, setMessage] = useState("");

  function handleLogout(device: string) {
    setMessage(
      `${device} will be signed out once session management is connected.`
    );

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Active Sessions
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Review the devices currently signed in to your Synapse account.
        </p>
      </div>

      {/* Security notice */}
      <div className="flex gap-3 rounded-2xl border border-[var(--synapse-accent-500)]/20 bg-[var(--synapse-accent-500)]/10 p-4">
        <ShieldCheck
          size={20}
          className="mt-0.5 shrink-0 text-[var(--synapse-accent-500)] dark:text-[var(--synapse-accent-500)]"
        />

        <div>
          <p className="font-medium">
            Keep your account secure
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            If you don't recognize a device, sign it out and change your
            password.
          </p>
        </div>
      </div>

      {/* Feedback */}
      {message && (
        <div className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm">
          {message}
        </div>
      )}

      {/* Sessions */}
      <section className="rounded-3xl border border-border bg-card p-6">

        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Your devices
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            These are the devices that currently have access to your account.
          </p>
        </div>

        <div className="space-y-3">

          {sessions.map((session) => {
            const Icon = session.icon;

            return (
              <div
                key={session.id}
                className="
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-border
                  p-4
                  transition
                  hover:bg-muted/40
                "
              >

                {/* Device icon */}
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-muted
                    text-muted-foreground
                  "
                >
                  <Icon size={21} />
                </div>

                {/* Device information */}
                <div className="min-w-0 flex-1">

                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">
                      {session.device}
                    </h3>

                    {session.current && (
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {session.browser} · {session.location}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {session.lastActive}
                  </p>

                </div>

                {/* Logout */}
                {!session.current && (
                  <button
                    type="button"
                    onClick={() =>
                      handleLogout(session.device)
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      px-3
                      py-2
                      text-sm
                      font-medium
                      text-red-600
                      transition
                      hover:bg-red-500/10
                      dark:text-red-400
                    "
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                )}

              </div>
            );
          })}

        </div>

      </section>

      {/* Sign out all */}
      <section className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6">

        <h2 className="font-semibold">
          Sign out of all other devices
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          This will remove access from every device except the one you're
          currently using.
        </p>

        <button
          type="button"
          onClick={() =>
            handleLogout("All other devices")
          }
          className="
            mt-4
            rounded-xl
            bg-red-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition
            hover:bg-red-700
          "
        >
          Sign out all other devices
        </button>

      </section>

    </div>
  );
}