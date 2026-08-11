import { ArrowLeft, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  title?: string;
  description?: string;
  showBack?: boolean;
}

export default function SettingsHeader({
  title = "Settings",
  description = "Manage your Synapse experience",
  showBack = false,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4">
        {showBack ? (
          <button
            onClick={() => navigate("/app/settings")}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-muted-foreground
              transition
              hover:bg-muted
              hover:text-foreground
            "
          >
            <ArrowLeft size={20} />
          </button>
        ) : (
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-[var(--synapse-accent-500)]/10
              text-[var(--synapse-accent-500)]
              dark:text-[var(--synapse-accent-500)]
            "
          >
            <Settings size={21} />
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {title}
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}