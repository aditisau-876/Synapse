import { Clock3 } from "lucide-react";

export default function MeetingTimer() {
  return (
    <div
      className="
      flex
      items-center
      gap-2
      rounded-full
      bg-black/50
      px-4
      py-2
      text-white
      backdrop-blur-xl
      "
    >
      <Clock3 size={16} />

      <span className="font-medium">
        00:18:43
      </span>
    </div>
  );
}