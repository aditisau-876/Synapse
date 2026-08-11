interface Props {
  labels: string[];
}

export default function Labels({
  labels,
}: Props) {
  return (
    <div
      className="
      mt-3
      flex
      flex-wrap
      gap-2
      "
    >
      {labels.map((label) => (
        <span
          key={label}
          className="
          rounded-full
          bg-[var(--synapse-accent-500)]/10
          px-3
          py-1
          text-xs
          text-[var(--synapse-accent-700)]
          "
        >
          {label}
        </span>
      ))}
    </div>
  );
}