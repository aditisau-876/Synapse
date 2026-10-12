import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/** Two nodes joined by a curve: a signal crossing a synapse. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[var(--synapse-accent-500)]",
        className,
      )}
    >
      <svg viewBox="0 0 32 32" className="size-full" fill="none" aria-hidden="true">
        <path
          d="M9.5 21.5C9.5 12 22.5 22 22.5 11.5"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="9.5" cy="21.5" r="3.4" fill="#fff" />
        <circle cx="22.5" cy="11.5" r="3.4" fill="var(--synapse-accent-secondary)" />
      </svg>
    </span>
  );
}

interface Props {
  className?: string;
  /** Hide the wordmark (collapsed sidebar). */
  markOnly?: boolean;
  to?: string;
}

export default function Logo({ className, markOnly = false, to = "/" }: Props) {
  return (
    <Link
      to={to}
      aria-label="Synapse home"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <LogoMark />
      {!markOnly && (
        <span className="font-display text-xl font-bold tracking-tight">
          Synapse
        </span>
      )}
    </Link>
  );
}
