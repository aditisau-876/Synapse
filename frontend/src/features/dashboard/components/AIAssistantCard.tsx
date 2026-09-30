import {
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function AIAssistantCard() {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl

        bg-gradient-to-br
        from-[var(--synapse-accent-700)]
        via-indigo-700
        to-slate-900

        p-8

        text-white

        shadow-2xl
        shadow-[var(--synapse-accent-500)]/20
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-52
          w-52
          rounded-full
          bg-[var(--synapse-accent-500)]/20
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-10
          h-48
          w-48
          rounded-full
          bg-indigo-400/10
          blur-3xl
        "
      />

      <div className="relative z-10">
        <Sparkles
          size={38}
          className="text-yellow-300"
        />

        <h2
          className="
            mt-5
            text-2xl
            font-black
            text-white
          "
        >
          Synapse AI
        </h2>

        <p
          className="
            mt-3
            max-w-md
            text-[var(--synapse-accent-100)]
          "
        >
          Generate tasks, summarize meetings,
          search files and collaborate smarter.
        </p>

        <button
          className="
            mt-6
            flex
            items-center
            gap-2

            rounded-xl

            bg-card

            px-5
            py-3

            font-semibold
            text-foreground

            shadow-lg

            transition-all
            duration-200

            hover:-translate-y-0.5
            hover:bg-[var(--synapse-accent-50)]
            hover:shadow-xl
          "
        >
          Open AI

          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}