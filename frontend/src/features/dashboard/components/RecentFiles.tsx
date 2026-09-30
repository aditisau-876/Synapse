import {
  FileText,
  Image,
  PenTool,
} from "lucide-react";

import { useDashboard } from "../hooks/useDashboard";

const icons = {
  PDF: FileText,
  Image,
  PenTool,
};

export default function RecentFiles() {
  const { files } = useDashboard();

  return (
    <div
      className="
        rounded-3xl
        border
        border-[var(--synapse-accent-100)]
        bg-card
        p-6

        dark:border-white/10
        dark:bg-card
        dark:shadow-xl
      "
    >
      <h2
        className="
          mb-6
          text-xl
          font-bold
          text-slate-800

          dark:text-foreground
        "
      >
        Recent Files
      </h2>

      <div className="space-y-4">
        {files.map((file) => {
          const Icon =
            icons[file.type as keyof typeof icons] ??
            FileText;

          return (
            <div
              key={file.id}
              className="
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-[var(--synapse-accent-100)]
                bg-[var(--synapse-accent-50)]/60
                p-3

                dark:border-white/5
                dark:bg-card/5
              "
            >
              <div
                className="
                  rounded-xl
                  bg-[var(--synapse-accent-100)]
                  p-3
                  text-[var(--synapse-accent-500)]

                  dark:bg-[var(--synapse-accent-500)]/20
                  dark:text-[var(--synapse-accent-300)]
                "
              >
                <Icon size={20} />
              </div>

              <div className="flex-1">
                <h3
                  className="
                    font-medium
                    text-slate-800

                    dark:text-foreground
                  "
                >
                  {file.name}
                </h3>

                <p
                  className="
                    text-sm
                    text-slate-500

                    dark:text-muted-foreground
                  "
                >
                  {file.size}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}