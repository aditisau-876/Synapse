import ParticipantTile from "../room/ParticipantTile";

const participants = [
  {
    name: "You",
    speaking: true,
    cameraOff: false,
  },
  {
    name: "Alex",
    speaking: false,
    cameraOff: true,
  },
  {
    name: "Sarah",
    speaking: false,
    cameraOff: false,
  },
  {
    name: "Emily",
    speaking: false,
    cameraOff: true,
  },
  {
    name: "James",
    speaking: false,
    cameraOff: false,
  },
  {
    name: "Sophia",
    speaking: false,
    cameraOff: false,
  },
];

export default function GalleryView() {
  return (
    <div
      className="
      grid
      flex-1
      grid-cols-3
      gap-6
      overflow-auto
      p-8
      "
    >
      {participants.map((participant) => (
        <ParticipantTile
          key={participant.name}
          {...participant}
        />
      ))}
    </div>
  );
}