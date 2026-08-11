import {
  Mic,
  MicOff,
  Crown,
} from "lucide-react";

const participants = [

  {
    name: "You",
    host: true,
    muted: false,
  },

  {
    name: "Alex",
    host: false,
    muted: false,
  },

  {
    name: "Sarah",
    host: false,
    muted: true,
  },

  {
    name: "Emily",
    host: false,
    muted: true,
  },

];

export default function ParticipantsPanel() {
  return (
    <div className="p-5">

      <h2 className="mb-6 text-lg font-bold text-white">
        Participants ({participants.length})
      </h2>

      <div className="space-y-4">

        {participants.map((participant) => (

          <div
            key={participant.name}
            className="
            flex
            items-center
            justify-between
            rounded-2xl
            bg-white/5
            p-4
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-gradient-to-r
                from-[var(--synapse-accent-500)]
                to-indigo-600
                font-bold
                text-white
                "
              >
                {participant.name.charAt(0)}
              </div>

              <div>

                <p className="text-white">
                  {participant.name}
                </p>

                {participant.host && (
                  <div className="flex items-center gap-1 text-xs text-yellow-400">

                    <Crown size={14} />

                    Host

                  </div>
                )}

              </div>

            </div>

            {participant.muted ? (
              <MicOff className="text-red-400" />
            ) : (
              <Mic className="text-green-400" />
            )}

          </div>

        ))}

      </div>
    </div>
  );
}