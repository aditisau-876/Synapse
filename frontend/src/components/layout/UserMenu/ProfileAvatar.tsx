import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { hueFor, initials } from "@/lib/people";

interface Props {
  name: string;
  /** Show a presence dot. Omit to show none. */
  online?: boolean;
  image?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Groups are rounded squares, people are circles. */
  group?: boolean;
  className?: string;
}

const SIZES = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-20 text-2xl",
} as const;

const DOT = {
  xs: "size-2",
  sm: "size-2.5",
  md: "size-3",
  lg: "size-3.5",
  xl: "size-4",
} as const;

export default function ProfileAvatar({
  name,
  online,
  image,
  size = "md",
  group = false,
  className,
}: Props) {
  const shape = group ? "rounded-xl" : "rounded-full";
  const style = { "--h": hueFor(name) } as CSSProperties;

  return (
    <div className={cn("relative shrink-0", SIZES[size], className)}>
      {image ? (
        <img
          src={image}
          alt=""
          className={cn("size-full object-cover", shape)}
        />
      ) : (
        <div
          style={style}
          aria-hidden="true"
          className={cn(
            "flex size-full select-none items-center justify-center font-semibold",
            "bg-[hsl(var(--h)_42%_88%)] text-[hsl(var(--h)_50%_24%)]",
            "dark:bg-[hsl(var(--h)_26%_26%)] dark:text-[hsl(var(--h)_60%_86%)]",
            shape,
          )}
        >
          {initials(name)}
        </div>
      )}

      {online !== undefined && (
        <span
          title={online ? "Online" : "Offline"}
          className={cn(
            "absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-card",
            DOT[size],
            online ? "bg-presence" : "bg-muted-foreground/50",
          )}
        />
      )}
    </div>
  );
}
