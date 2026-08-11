import { ArrowRight } from "lucide-react";

export default function JoinMeetingCard() {
  return (
    <div
      className="
      rounded-[36px]
      border
      border-white/10
      bg-white/5
      p-8
      backdrop-blur-xl
      "
    >
      <h2 className="text-3xl font-black text-white">
        Design Sprint
      </h2>

      <p className="mt-3 text-white/60">
        Meeting ID: 8HJ2-K91-QWE
      </p>

      <button
        className="
        mt-10
        flex
        w-full
        items-center
        justify-center
        gap-3
        rounded-2xl
        bg-gradient-to-r
        from-[var(--synapse-accent-500)]
        to-indigo-600
        py-4
        text-white
        shadow-xl
        "
      >
        Join Meeting

        <ArrowRight />
      </button>
    </div>
  );
}