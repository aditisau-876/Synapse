const options = [
    "Approve",
    "Reject",
    "Need Discussion",
];

export default function LivePoll() {

    return (

        <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">

            <h2 className="text-xl font-bold">
                Live Poll
            </h2>

            <p className="mt-2 text-muted-foreground">
                Should we deploy today?
            </p>

            <div className="mt-5 space-y-3">

                {options.map(option => (

                    <button
                        key={option}
                        className="w-full rounded-xl bg-white/5 p-4 text-left hover:bg-[var(--synapse-accent-500)]"
                    >
                        {option}
                    </button>

                ))}

            </div>

        </div>

    );

}