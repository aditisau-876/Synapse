import { Monitor, Smartphone } from "lucide-react";

export default function SessionCard() {
  return (
    <div className="space-y-3">

      <h3 className="text-sm font-semibold">
        Current sessions
      </h3>

      <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/40 p-4">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--synapse-accent-500)]/10 text-brand dark:text-brand">
          <Monitor size={19} />
        </div>

        <div className="flex-1">
          <p className="font-medium">
            Windows PC
          </p>

          <p className="text-sm text-muted-foreground">
            Active now
          </p>
        </div>

        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

      </div>

      <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/40 p-4">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--synapse-accent-500)]/10 text-brand dark:text-brand">
          <Smartphone size={19} />
        </div>

        <div className="flex-1">
          <p className="font-medium">
            Mobile device
          </p>

          <p className="text-sm text-muted-foreground">
            Last active recently
          </p>
        </div>

      </div>

    </div>
  );
}