import { Sparkles } from "lucide-react";
import type {LucideIcon} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  icon?: LucideIcon;
  title: string;
  description: string;
  buttonText?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon: Icon = Sparkles,
  title,
  description,
  buttonText,
  onAction,
}: Props) {
  return (
    <div
      className="
      flex
      min-h-[340px]
      flex-col
      items-center
      justify-center
      rounded-3xl
      border
      border-white/10
      bg-gradient-to-br
      from-slate-900
      via-[#181828]
      to-slate-900
      p-8
      text-center
      shadow-xl
      "
    >
      <div
        className="
        mb-6
        flex
        h-20
        w-20
        items-center
        justify-center
        rounded-full
        bg-gradient-to-br
        from-[var(--synapse-accent-700)] to-[var(--synapse-accent-500)]
        shadow-lg
        "
      >
        <Icon size={34} className="text-white" />
      </div>

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p
        className="
        mt-3
        max-w-sm
        text-muted-foreground
        "
      >
        {description}
      </p>

      {buttonText && (
        <Button
          onClick={onAction}
          className="
          mt-7
          rounded-xl
          px-6
          "
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}