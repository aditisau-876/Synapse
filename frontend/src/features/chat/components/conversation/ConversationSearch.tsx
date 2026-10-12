import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ConversationSearch({ value, onChange }: Props) {
  return (
    <div className="px-3 pb-2">
      <label className="flex h-9 items-center gap-2 rounded-lg bg-muted px-3 text-muted-foreground focus-within:ring-2 focus-within:ring-ring">
        <Search size={16} className="shrink-0" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search chats"
          aria-label="Search chats"
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </label>
    </div>
  );
}
