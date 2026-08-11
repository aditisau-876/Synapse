const users = [
    "You",
    "Alex",
    "Sarah",
    "Emily",
    "James",
];

export default function ParticipantList() {

    return (

        <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">

            <h2 className="mb-6 text-xl font-bold">
                Participants
            </h2>

            <div className="space-y-4">

                {users.map(user => (

                    <div
                        key={user}
                        className="flex items-center gap-4"
                    >

                        <div className="h-10 w-10 rounded-full bg-[var(--synapse-accent-500)]"/>

                        <span>{user}</span>

                    </div>

                ))}

            </div>

        </div>

    );

}