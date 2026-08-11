import { Calendar } from "lucide-react";

interface Props {
  dueDate: string;
}

export default function DueDateChip({
  dueDate,
}: Props) {
  return (
    <div
      className="
      flex
      items-center
      gap-2
      rounded-full
      bg-muted
      px-3
      py-1
      text-xs
      text-muted-foreground
      "
    >
      <Calendar size={14} />

      {dueDate}
    </div>
  );
}