import { Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  icon?: LucideIcon;
  title: string;
  description: string;
  buttonText?: string;
  onAction?: () => void;
  className?: string;
}

/** Emptiness is an invitation to act: say what's missing and how to fix it. */
export default function EmptyState({
  icon: Icon = Sparkles,
  title,
  description,
  buttonText,
  onAction,
  className = "",
}: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center px-6 py-12 text-center ${className}`}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[var(--synapse-accent-500)]/10 text-brand">
        <Icon size={22} />
      </div>
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
        {description}
      </p>
      {buttonText && (
        <Button onClick={onAction} className="mt-5">
          {buttonText}
        </Button>
      )}
    </div>
  );
}
