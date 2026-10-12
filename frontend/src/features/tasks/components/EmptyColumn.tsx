import { Inbox } from "lucide-react";

interface Props {
  title: string;
}

export default function EmptyColumn({
  title,
}: Props) {
  return (
    <div
      className="
      flex
      min-h-[180px]
      flex-col
      items-center
      justify-center
      rounded-2xl
      border
      border-dashed
      border-border
      bg-white/5
      p-6
      text-center
      "
    >
      <Inbox
        size={34}
        className="mb-3 text-brand"
      />

      <h3 className="font-semibold">
        No {title} Tasks
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        Drag a task here or create one.
      </p>
    </div>
  );
}