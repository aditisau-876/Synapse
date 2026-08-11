import {
  MessageSquare,
  Video,
  PenSquare,
  BrainCircuit,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Chats",
    icon: MessageSquare,
    path: "/app/chats",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Meetings",
    icon: Video,
    path: "/app/meetings",
    color: "from-[var(--synapse-accent-500)] to-fuchsia-500",
  },
  {
    title: "Whiteboard",
    icon: PenSquare,
    path: "/app/whiteboard",
    color: "from-orange-500 to-pink-500",
  },
  {
    title: "AI Workspace",
    icon: BrainCircuit,
    path: "/app/ai",
    color: "from-emerald-500 to-green-500",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <section
      className="
        rounded-3xl
        border
        border-[var(--synapse-accent-100)]
        bg-white
        p-6

        dark:border-white/10
        dark:bg-slate-900
        dark:shadow-xl
      "
    >
      <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="
                group
                rounded-2xl
                border
                border-[var(--synapse-accent-200)]
                bg-slate-50
                p-6

                transition-all
                duration-300

                hover:-translate-y-2
                hover:border-[var(--synapse-accent-300)]
                hover:bg-[var(--synapse-accent-50)]
                hover:shadow-md

                dark:border-white/10
                dark:bg-white/5
                dark:hover:border-[var(--synapse-accent-500)]
                dark:hover:bg-[var(--synapse-accent-500)]/10
              "
            >
              <div
                className={`
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  ${action.color}
                  shadow-lg
                  transition-transform
                  duration-300
                  group-hover:scale-110
                `}
              >
                <Icon
                  size={25}
                  className="text-white"
                />
              </div>

              <p className="mt-4 text-center font-semibold text-slate-800 dark:text-white">
                {action.title}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

