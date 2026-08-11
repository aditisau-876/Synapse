import {
  CalendarDays,
} from "lucide-react";

export default function CalendarWidget() {
  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div
      className="
        rounded-3xl
        border
        border-[var(--synapse-accent-500)]/20
        bg-gradient-to-br
        from-[var(--synapse-accent-700)]
        via-indigo-600
        to-slate-900
        p-6
        text-white
      "
    >
      <div
        className="
          mb-4
          flex
          items-center
          gap-3
        "
      >
        <CalendarDays size={28} />

        <h2 className="text-xl font-bold">
          Calendar
        </h2>
      </div>

      <p className="text-lg">
        {today}
      </p>

      <div
        className="
          mt-8
          rounded-2xl
          border
          border-white/10
          bg-white/10
          p-5
          backdrop-blur-xl
        "
      >
        <p className="text-sm">
          📅 2 Meetings Today
        </p>

        <p className="mt-2 text-sm">
          ✅ 3 Tasks Pending
        </p>
      </div>
    </div>
  );
}