const transcript = [
  {
    speaker: "Alex",
    text: "Let's start today's meeting.",
  },
  {
    speaker: "Sarah",
    text: "Authentication is finished.",
  },
  {
    speaker: "Emily",
    text: "Backend deployment tomorrow.",
  },
];

export default function TranscriptPanel() {
  return (
    <div
      className="
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-6
      "
    >
      <h3 className="mb-5 text-xl font-bold text-white">
        Transcript
      </h3>

      <div className="space-y-5">
        {transcript.map((line, index) => (
          <div key={index}>
            <p className="font-semibold text-[var(--synapse-accent-300)]">
              {line.speaker}
            </p>

            <p className="mt-1 text-white/70">
              {line.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}