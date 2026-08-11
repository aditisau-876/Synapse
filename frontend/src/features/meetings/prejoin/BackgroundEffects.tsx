export default function BackgroundEffects() {
  return (
    <>
      <div
        className="
        pointer-events-none
        absolute
        left-20
        top-20
        h-80
        w-80
        rounded-full
        bg-[var(--synapse-accent-500)]/20
        blur-[160px]
        "
      />

      <div
        className="
        pointer-events-none
        absolute
        bottom-10
        right-10
        h-96
        w-96
        rounded-full
        bg-cyan-500/15
        blur-[180px]
        "
      />
    </>
  );
}