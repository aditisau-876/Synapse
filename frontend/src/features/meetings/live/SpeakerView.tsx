import ParticipantTile from "../room/ParticipantTile";

const audience = [
  "You",
  "Sarah",
  "Emily",
  "James",
];

export default function SpeakerView() {
  return (
    <div className="flex flex-1 flex-col p-6">

      <div className="flex-1">

        <ParticipantTile
          name="Alex Johnson"
          speaking
          cameraOff={false}
        />

      </div>

      <div
        className="
        mt-6
        flex
        gap-4
        overflow-x-auto
        "
      >
        {audience.map((person) => (

          <div
            key={person}
            className="w-52 shrink-0"
          >

            <ParticipantTile
              name={person}
              cameraOff={false}
            />

          </div>

        ))}
      </div>

    </div>
  );
}