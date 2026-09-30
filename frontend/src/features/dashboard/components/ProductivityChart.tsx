const values = [45, 82, 63, 94, 70, 86, 58];

export default function ProductivityChart() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-[var(--synapse-accent-200)]
        bg-card
        p-6
        dark:border-white/10
        dark:bg-card
        dark:shadow-xl
      "
    >
      <h2 className="mb-6 text-xl font-bold">
        Weekly Productivity
      </h2>

      <div className="flex h-56 items-end justify-between gap-3">
        {values.map((value, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col items-center"
          >
            <div
              style={{
                height: `${value}%`,
              }}
              className="
                w-full
                rounded-t-xl
                bg-gradient-to-t
                from-[var(--synapse-accent-500)]
                to-cyan-400
                transition-all
                duration-700
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}