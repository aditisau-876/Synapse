import MeetingCard from "./MeetingCard";
import { meetings } from "../data/meetings";

export default function MeetingList() {
  return (
    <div
      className="
      mt-8
      grid
      gap-6
      md:grid-cols-2
      xl:grid-cols-3
      "
    >
      {meetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          meeting={meeting}
        />
      ))}
    </div>
  );
}