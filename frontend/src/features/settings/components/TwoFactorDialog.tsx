import { ShieldCheck, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function TwoFactorDialog({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl border border-border bg-background p-6 shadow-2xl">

        <div className="mb-6 flex items-start justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Two-factor authentication
              </h2>

              <p className="text-sm text-muted-foreground">
                Add an extra layer of security.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X size={20} />
          </button>

        </div>

        <div className="rounded-2xl border border-border bg-muted/40 p-5">

          <p className="text-sm leading-6 text-muted-foreground">
            Two-factor authentication will require
            an additional verification code when you
            sign in from a new device.
          </p>

        </div>

        <div className="mt-6 space-y-3">

          <button
            type="button"
            onClick={() =>
              console.log("2FA setup started")
            }
            className="w-full rounded-xl bg-[var(--synapse-accent-500)] px-5 py-3 font-semibold text-white transition hover:bg-[var(--synapse-accent-700)]"
          >
            Start setup
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-border px-5 py-3 font-medium transition hover:bg-muted"
          >
            Maybe later
          </button>

        </div>

      </div>
    </div>
  );
}