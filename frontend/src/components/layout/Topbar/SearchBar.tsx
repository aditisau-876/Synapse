import { Search } from "lucide-react";

export default function SearchBar() {

  return (

    <div
      className="
      relative
      hidden
      md:block
      w-full
      max-w-md
      "
    >

      <Search
        size={18}
        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-muted-foreground
        "
      />

      <input
        placeholder="Search chats, meetings, files..."
        className="
        h-11
        w-full
        rounded-xl
        border
        border-border
        bg-background
        pl-11
        pr-4
        outline-none
        transition-all
        focus:border-[var(--synapse-accent-500)]
        focus:ring-4
        focus:ring-[var(--synapse-accent-500)]/10
        "
      />

    </div>

  );

}