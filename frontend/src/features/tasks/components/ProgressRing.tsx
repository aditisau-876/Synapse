interface Props {
  progress: number;
}

export default function ProgressRing({
  progress,
}: Props) {
  return (
    <div>

      <div
        className="
        mb-2
        flex
        justify-between
        text-xs
        "
      >
        <span>Progress</span>

        <span>{progress}%</span>
      </div>

      <div
        className="
        h-2
        overflow-hidden
        rounded-full
        bg-white/10
        "
      >
        <div
          style={{
            width: `${progress}%`,
          }}
          className="
          h-full
          rounded-full
          bg-gradient-to-r
          from-[var(--synapse-accent-500)]
          to-cyan-400
          transition-all
          duration-500
          "
        />
      </div>

    </div>
  );
}