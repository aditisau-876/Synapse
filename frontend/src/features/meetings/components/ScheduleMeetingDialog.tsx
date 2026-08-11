export default function ScheduleMeetingDialog() {

  return (

    <div
      className="
      rounded-3xl
      border
      border-border
      bg-background
      p-8
      shadow-xl
      "
    >

      <h2 className="mb-6 text-2xl font-bold">
        Schedule Meeting
      </h2>

      <div className="space-y-5">

        <input
          placeholder="Meeting title"
          className="w-full rounded-xl border p-3"
        />

        <input
          type="date"
          className="w-full rounded-xl border p-3"
        />

        <input
          type="time"
          className="w-full rounded-xl border p-3"
        />

        <textarea
          placeholder="Description"
          rows={4}
          className="w-full rounded-xl border p-3"
        />

        <button
          className="
          w-full
          rounded-xl
          bg-gradient-to-r
          from-[var(--synapse-accent-500)]
          to-indigo-600
          py-3
          text-white
          "
        >
          Schedule
        </button>

      </div>

    </div>

  );

}