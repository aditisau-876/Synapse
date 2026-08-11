import {
  CalendarDays,
  Clock3,
  Link,
  Users,
} from "lucide-react";

export default function MeetingInfo() {
  return (
    <div className="space-y-6 p-6">

      <div>

        <h2 className="text-xl font-bold text-white">
          Meeting Details
        </h2>

      </div>

      <div className="space-y-4">

        <div className="flex items-center gap-3 text-white">

          <CalendarDays />

          Today

        </div>

        <div className="flex items-center gap-3 text-white">

          <Clock3 />

          3:00 PM

        </div>

        <div className="flex items-center gap-3 text-white">

          <Users />

          12 Participants

        </div>

        <div className="flex items-center gap-3 text-white">

          <Link />

          synapse.app/meet/ABCD

        </div>

      </div>

    </div>
  );
}