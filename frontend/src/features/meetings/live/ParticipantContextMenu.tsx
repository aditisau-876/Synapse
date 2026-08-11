import {
    Pin,
    UserPlus,
    Volume2,
    Shield,
} from "lucide-react";

const actions = [
    { icon: Pin, label: "Pin Video" },
    { icon: Volume2, label: "Mute Participant" },
    { icon: UserPlus, label: "Make Presenter" },
    { icon: Shield, label: "View Profile" },
];

export default function ParticipantContextMenu() {
    return (
        <div className="w-60 rounded-3xl border border-white/10 bg-slate-900 p-3 shadow-2xl">

            {actions.map(({ icon: Icon, label }) => (

                <button
                    key={label}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-white/10"
                >
                    <Icon size={18} />

                    {label}

                </button>

            ))}

        </div>
    );
}