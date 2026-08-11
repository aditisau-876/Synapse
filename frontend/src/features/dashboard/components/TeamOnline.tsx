import { useDashboard } from "../hooks/useDashboard";

export default function TeamOnline() {
  const { team } = useDashboard();

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
      <h2
        className="
          mb-6
          text-xl
          font-bold
          text-slate-800

          dark:text-white
        "
      >
        Team Online
      </h2>

      <div className="space-y-4">
        {team.map((member) => (
          <div
            key={member.id}
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
                {member.name[0]}
              </div>

              {member.online && (
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

            <div>
              <h3
                className="
                  font-semibold
                  text-slate-800

                  dark:text-white
                "
              >
                {member.name}
              </h3>

              <p
                className="
                  text-sm
                  text-slate-500

                  dark:text-muted-foreground
                "
              >
                {member.online
                  ? "Online"
                  : "Offline"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}