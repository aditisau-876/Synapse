interface Props {
  speaker: string;
  message: string;
}

export default function CaptionBubble({
  speaker,
  message,
}: Props) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-[var(--synapse-accent-500)]/20
      bg-black/60
      px-5
      py-4
      text-center
      shadow-xl
      backdrop-blur-2xl
      "
    >
      <p className="text-sm font-semibold text-[var(--synapse-accent-300)]">
        {speaker}
      </p>

      <p className="mt-2 text-white">
        {message}
      </p>
    </div>
  );
}