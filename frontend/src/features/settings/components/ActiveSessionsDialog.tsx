import {
  MonitorSmartphone,
  Smartphone,
  Laptop,
  X,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const sessions = [
  {
    id: 1,
    device: "Windows PC",
    location: "Current device",
    icon: Laptop,
    current: true,
  },
  {
    id: 2,
    device: "Android Phone",
    location: "Last active recently",
    icon: Smartphone,
    current: false,
  },
  {
    id: 3,
    device: "Chrome Browser",
    location: "Last active yesterday",
    icon: MonitorSmartphone,
    current: false,
  },
];

export default function ActiveSessionsDialog({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-3xl border border-border bg-background p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold">
              Active Sessions
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Devices currently signed in to your account.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X size={20} />
          </button>

        </div>

        <div className="space-y-3">

          {sessions.map((session) => {
            const Icon = session.icon;

            return (
              <div
                key={session.id}
                className="flex items-center gap-4 rounded-2xl border border-border bg-muted/30 p-4"
              >

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--synapse-accent-500)]/10 text-brand dark:text-brand">
                  <Icon size={21} />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex items-center gap-2">

                    <p className="font-medium">
                      {session.device}
                    </p>

                    {session.current && (
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        Current
                      </span>
                    )}

                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {session.location}
                  </p>

                </div>

                {!session.current && (
                  <button
                    type="button"
                    onClick={() =>
                      console.log(
                        "Sign out session:",
                        session.id
                      )
                    }
                    className="rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-500/10 dark:text-red-400"
                  >
                    Sign out
                  </button>
                )}

              </div>
            );
          })}

        </div>

        <div className="mt-6 rounded-2xl bg-muted/40 p-4">

          <p className="text-sm text-muted-foreground">
            You'll be able to see real devices and
            locations here once session management is
            connected to the backend.
          </p>

        </div>

      </div>
    </div>
  );
}