import {
  MessageSquare,
  Video,
  PenSquare,
  BrainCircuit,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const items = [
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

export default function ContinueWorking() {
  const navigate = useNavigate();

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
      <h2 className="mb-6 text-xl font-bold text-foreground dark:text-foreground">
        Continue Working
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={() => navigate(item.path)}
              className="
                group
                rounded-2xl
                border
                border-[var(--synapse-accent-200)]
                bg-slate-50
                p-5

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-[var(--synapse-accent-300)]
                hover:bg-[var(--synapse-accent-50)]
                hover:shadow-md

                dark:border-white/10
                dark:bg-card/5
                dark:hover:border-[var(--synapse-accent-500)]
                dark:hover:bg-[var(--synapse-accent-500)]/10
              "
            >
              <div
                className={`
                  mb-4
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  ${item.color}
                  shadow-lg
                  transition-transform
                  duration-300
                  group-hover:scale-105
                `}
              >
                <Icon
                  size={24}
                  className="text-white"
                />
              </div>

              <h3 className="font-semibold text-slate-800 dark:text-foreground">
                {item.title}
              </h3>
            </button>
          );
        })}
      </div>
    </div>
  );
}