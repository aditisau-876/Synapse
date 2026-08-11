const tasks = [
  "Finish dashboard UI",
  "Deploy backend",
  "Review authentication",
  "Schedule testing",
];

export default function ActionItems() {
  return (
    <div
      className="
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-6
      "
    >
      <h3 className="mb-4 text-xl font-bold text-white">
        Action Items
      </h3>

      <div className="space-y-4">
        {tasks.map((task) => (
          <label
            key={task}
            className="flex items-center gap-3 text-white"
          >
            <input type="checkbox" />

            {task}
          </label>
        ))}
      </div>
    </div>
  );
}