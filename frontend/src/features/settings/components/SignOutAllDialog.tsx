import { AlertTriangle, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SignOutAllDialog({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  function handleSignOut() {
    console.log("Sign out of all devices");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl border border-border bg-background p-6 shadow-2xl">

        <div className="flex items-start justify-between">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
            <AlertTriangle size={22} />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X size={20} />
          </button>

        </div>

        <h2 className="mt-5 text-xl font-bold">
          Sign out of all devices?
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          This will sign you out from every other
          device where your Synapse account is currently
          active. Your current device will remain signed in.
        </p>

        <div className="mt-7 flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Sign out all
          </button>

        </div>

      </div>
    </div>
  );
}