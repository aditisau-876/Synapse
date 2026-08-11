interface Props {
  priority: "Low" | "Medium" | "High";
}

export default function PriorityBadge({
  priority,
}: Props) {
  const styles = {
    Low: "bg-emerald-500/20 text-emerald-400",

    Medium: "bg-yellow-500/20 text-yellow-400",

    High: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`
      rounded-full
      px-3
      py-1
      text-xs
      font-semibold
      ${styles[priority]}
      `}
    >
      {priority}
    </span>
  );
}