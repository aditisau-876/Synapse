import {
  MessageSquare,
  Video,
  CheckSquare,
  Folder,
} from "lucide-react";

import { motion } from "framer-motion";

const stats = [
  {
    title: "Chats",
    value: 28,
    icon: MessageSquare,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Meetings",
    value: 6,
    icon: Video,
    color: "from-[var(--synapse-accent-500)] to-fuchsia-500",
  },
  {
    title: "Tasks",
    value: 17,
    icon: CheckSquare,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Files",
    value: 82,
    icon: Folder,
    color: "from-orange-500 to-red-500",
  },
];

export default function DashboardStats() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300

              hover:-translate-y-1
              hover:shadow-lg

              dark:border-white/10
              dark:bg-slate-900
              dark:shadow-xl
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {item.title}
                </p>

                <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                  {item.value}
                </p>
              </div>

              <div
                className={`
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  ${item.color}
                  shadow-lg
                `}
              >
                <Icon
                  size={25}
                  className="text-white"
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}