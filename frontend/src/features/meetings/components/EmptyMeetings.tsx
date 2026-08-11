import { CalendarX2 } from "lucide-react";

export default function EmptyMeetings() {

  return (

    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      rounded-3xl
      border
      border-dashed
      border-border
      py-24
      "
    >

      <CalendarX2
        className="
        mb-6
        text-[var(--synapse-accent-500)]
        "
        size={64}
      />

      <h2 className="text-2xl font-bold">
        No meetings found
      </h2>

      <p className="mt-3 text-muted-foreground">
        Schedule a new meeting to begin collaborating.
      </p>

    </div>

  );

}