import { Camera, ChevronRight } from "lucide-react";

interface Props {
  name?: string;
  username?: string;
  about?: string;
  avatarUrl?: string;
  onClick?: () => void;
}

export default function ProfilePreview({
  name = "Aditi Sau",
  username = "@aditi",
  about = "Building something amazing 🚀",
  avatarUrl,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-center
        gap-5
        rounded-3xl
        border
        border-border
        bg-card
        p-5
        text-left
        transition-all
        duration-200
        hover:bg-muted/50
      "
    >
      <div className="relative shrink-0">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="
              h-16
              w-16
              rounded-full
              object-cover
            "
          />
        ) : (
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-[var(--synapse-accent-500)]
              text-xl
              font-bold
              text-white
            "
          >
            {name.charAt(0).toUpperCase()}
          </div>
        )}

        <div
          className="
            absolute
            bottom-0
            right-0
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            border-2
            border-card
            bg-[var(--synapse-accent-500)]
            text-white
          "
        >
          <Camera size={12} />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="truncate text-lg font-bold">
          {name}
        </h2>

        <p className="mt-0.5 text-sm text-brand dark:text-brand">
          {username}
        </p>

        <p className="mt-1 truncate text-sm text-muted-foreground">
          {about}
        </p>
      </div>

      <ChevronRight
        size={20}
        className="
          shrink-0
          text-muted-foreground
          transition-transform
          duration-200
          group-hover:translate-x-0.5
        "
      />
    </button>
  );
}