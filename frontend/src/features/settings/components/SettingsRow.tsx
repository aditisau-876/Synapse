import { ChevronRight } from "lucide-react";

interface Props {
  icon?: React.ElementType;
  title: string;
  description?: string;
  onClick?: () => void;
  rightContent?: React.ReactNode;
  destructive?: boolean;
}

export default function SettingsRow({
  icon: Icon,
  title,
  description,
  onClick,
  rightContent,
  destructive = false,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        w-full
        items-center
        gap-4
        px-5
        py-4
        text-left
        transition
        hover:bg-muted/60
      "
    >

      {Icon && (
        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${
              destructive
                ? "bg-red-500/10 text-red-500"
                : "bg-[var(--synapse-accent-500)]/10 text-[var(--synapse-accent-500)]"
            }
          `}
        >
          <Icon size={19} />
        </div>
      )}

      <div className="min-w-0 flex-1">

        <p
          className={`
            font-medium
            ${
              destructive
                ? "text-red-500"
                : "text-foreground"
            }
          `}
        >
          {title}
        </p>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}

      </div>

      {rightContent ?? (
        <ChevronRight
          size={18}
          className="shrink-0 text-muted-foreground"
        />
      )}

    </button>
  );
}