import { useDashboard } from "../hooks/useDashboard";

export default function ActiveTasks() {
  const { tasks } = useDashboard();

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
        Active Tasks
      </h2>

      <div className="space-y-5">
        {tasks.map((task) => (
          <div key={task.id}>
            <div
              className="
                mb-2
                flex
                justify-between
              "
            >
              <span className="text-slate-700 dark:text-slate-100">
                {task.title}
              </span>

              <span
                className="
                  text-sm
                  text-slate-500

                  dark:text-muted-foreground
                "
              >
                {task.progress}%
              </span>
            </div>

            <div
              className="
                h-2
                overflow-hidden
                rounded-full
                bg-[var(--synapse-accent-100)]

                dark:bg-white/10
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-[var(--synapse-accent-500)]
                  to-indigo-500
                  transition-all
                  duration-700
                "
                style={{
                  width: `${task.progress}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}