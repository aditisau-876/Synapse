import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchTasks({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative w-full lg:max-w-md">
      <Search
        size={18}
        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-muted-foreground
        "
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tasks..."
        className="
          w-full
          rounded-2xl
          border
          border-border
          bg-card
          py-3
          pl-11
          pr-4
          text-sm
          text-foreground
          shadow-sm
          outline-none
          transition
          placeholder:text-muted-foreground
          focus:border-primary
          focus:ring-4
          focus:ring-primary/10
        "
      />
    </div>
  );
}