import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ConversationSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="px-4 pb-3">
      <div
        className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-border
        bg-muted/40
        px-4
        py-3
        shadow-sm

        transition-all
        duration-300

        hover:border-[var(--synapse-accent-500)]/50
        hover:shadow-md

        focus-within:border-[var(--synapse-accent-500)]
        focus-within:shadow-lg
        focus-within:shadow-[var(--synapse-accent-500)]/10

        dark:border-slate-700
        
        dark:hover:border-[var(--synapse-accent-500)]/60
        dark:focus-within:border-[var(--synapse-accent-500)]
        dark:focus-within:shadow-[var(--synapse-accent-500)]/20
        "
      >
        <Search
          size={18}
          className="
          text-slate-400
          transition-colors
          duration-300
          group-focus-within:text-[var(--synapse-accent-500)]
          dark:text-slate-500
          "
        />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search conversations..."
          className="
          w-full
          bg-transparent
          outline-none
          text-sm
          font-medium
          
          "
        />
      </div>
    </div>
  );
}