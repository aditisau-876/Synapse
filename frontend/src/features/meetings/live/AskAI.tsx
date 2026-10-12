import { Sparkles } from "lucide-react";

export default function AskAI() {
  return (
    <div
      className="
      rounded-3xl
      border
      border-[color:var(--synapse-accent-500)]/20
      bg-[var(--synapse-accent-500)]/10
      p-6
      "
    >
      <h3 className="flex items-center gap-2 text-xl font-bold text-white">
        <Sparkles />

        Ask AI
      </h3>

      <textarea
        rows={4}
        placeholder="Ask anything about this meeting..."
        className="
        mt-5
        w-full
        rounded-2xl
        bg-black/40
        p-4
        text-white
        outline-none
        "
      />

      <button
        className="
        mt-5
        w-full
        rounded-2xl
        bg-[var(--synapse-accent-500)]
        py-3
        font-semibold
        text-white
        "
      >
        Ask AI
      </button>
    </div>
  );
}