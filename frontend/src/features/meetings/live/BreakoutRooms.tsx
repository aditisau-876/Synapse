const rooms = [
    "Design Team",
    "Backend Team",
    "Marketing",
    "QA Team",
];

export default function BreakoutRooms() {

    return (

        <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">

            <h2 className="mb-5 text-xl font-bold">
                Breakout Rooms
            </h2>

            <div className="space-y-4">

                {rooms.map(room => (

                    <button
                        key={room}
                        className="w-full rounded-2xl bg-white/5 p-4 hover:bg-[var(--synapse-accent-500)]"
                    >
                        {room}
                    </button>

                ))}

            </div>

        </div>

    );

}