import {
  MessageCircle,
  CheckCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useDashboard } from "../hooks/useDashboard";

export default function RecentChats() {
  const navigate = useNavigate();

  const { recentChats } = useDashboard();

  return (
    <div
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
      <div
        className="
          mb-6
          flex
          items-center
          justify-between
        "
      >
        <div className="flex items-center gap-2">
          <MessageCircle
            size={20}
            className="text-[var(--synapse-accent-500)] dark:text-[var(--synapse-accent-500)]"
          />

          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Recent Chats
          </h2>
        </div>

        <button
          onClick={() => navigate("/app/chats")}
          className="
            text-sm
            font-medium
            text-[var(--synapse-accent-500)]
            transition
            hover:text-[var(--synapse-accent-700)]

            dark:text-[var(--synapse-accent-500)]
            dark:hover:text-[var(--synapse-accent-300)]
          "
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {recentChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => navigate("/app/chats")}
            className="
              flex
              w-full
              items-center
              gap-4
              rounded-2xl
              p-3
              text-left
              transition

              hover:bg-[var(--synapse-accent-50)]
              hover:shadow-sm

              dark:hover:bg-white/5
            "
          >
            <div className="relative">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-[var(--synapse-accent-500)]
                  to-indigo-600
                  font-bold
                  text-white
                "
              >
                {chat.name[0]}
              </div>

              {chat.online && (
                <span
                  className="
                    absolute
                    bottom-0
                    right-0
                    h-3
                    w-3
                    rounded-full
                    border-2
                    border-white
                    bg-green-500

                    dark:border-slate-900
                  "
                />
              )}
            </div>

            <div className="flex-1 text-left">
              <h3 className="font-semibold text-slate-800 dark:text-white">
                {chat.name}
              </h3>

              <p
                className="
                  truncate
                  text-sm
                  text-slate-500

                  dark:text-muted-foreground
                "
              >
                {chat.message}
              </p>
            </div>

            <div className="text-right">
              <p
                className="
                  text-xs
                  text-slate-400

                  dark:text-muted-foreground
                "
              >
                {chat.time}
              </p>

              {chat.unread > 0 ? (
                <span
                  className="
                    mt-2
                    inline-flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--synapse-accent-500)]
                    text-xs
                    font-bold
                    text-white
                  "
                >
                  {chat.unread}
                </span>
              ) : (
                <CheckCheck
                  size={16}
                  className="
                    ml-auto
                    mt-2
                    text-cyan-500

                    dark:text-cyan-400
                  "
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}