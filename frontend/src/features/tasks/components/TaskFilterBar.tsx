import {
  Filter,
  ArrowDownWideNarrow,
} from "lucide-react";

export default function TaskFilterBar() {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-border
          bg-card
          px-4
          py-3
          text-sm
          font-medium
          text-foreground
          shadow-sm
          transition
          hover:border-primary/40
          hover:bg-primary/5
        "
      >
        <Filter size={18} />
        Filters
      </button>

      <button
        type="button"
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-border
          bg-card
          px-4
          py-3
          text-sm
          font-medium
          text-foreground
          shadow-sm
          transition
          hover:border-primary/40
          hover:bg-primary/5
        "
      >
        <ArrowDownWideNarrow size={18} />
        Sort
      </button>
    </div>
  );
}