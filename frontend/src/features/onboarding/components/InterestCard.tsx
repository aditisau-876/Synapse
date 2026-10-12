interface Props {
  title: string;
  icon: React.ElementType;
  selected: boolean;
  onClick: () => void;
}

export default function InterestCard({
  title,
  icon: Icon,
  selected,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
      rounded-2xl
      border
      p-6
      transition-all

      ${
        selected
          ? "border-[color:var(--synapse-accent-500)] bg-[var(--synapse-accent-500)]/10"
          : "border-border hover:border-[color:var(--synapse-accent-500)]/40"
      }
      `}
    >
      <Icon className="mx-auto mb-3" size={28} />

      <p className="text-sm font-medium">{title}</p>
    </button>
  );
}