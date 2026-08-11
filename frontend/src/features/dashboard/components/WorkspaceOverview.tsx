import {
  Users,
  Folder,
  CheckSquare,
  Video,
} from "lucide-react";

const data = [
  {
    title: "Members",
    value: "12",
    icon: Users,
  },
  {
    title: "Projects",
    value: "8",
    icon: Folder,
  },
  {
    title: "Tasks",
    value: "34",
    icon: CheckSquare,
  },
  {
    title: "Meetings",
    value: "6",
    icon: Video,
  },
];

export default function WorkspaceOverview() {
  return (
    <div className="rounded-3xl
        border
        border-[var(--synapse-accent-200)]
        bg-white
        p-6

        dark:border-white/10
        dark:bg-slate-900
        dark:shadow-xl">

      <h2 className="mb-6 text-xl font-bold">
        Workspace Overview
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {data.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
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
              dark:bg-white/5
            "
            >
              <div
                className="
                  mb-4
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--synapse-accent-500)]/10
                  text-[var(--synapse-accent-500)]
                  dark:text-[var(--synapse-accent-500)]
                "
              >
                <Icon size={20} />
              </div>

              <p className="text-2xl font-bold">
                {item.value}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}