import { useState } from "react";
import { AtSign, CheckCircle2, CircleAlert } from "lucide-react";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

export default function UsernameInput({
  value = "",
  onChange,
}: Props) {
  const [username, setUsername] = useState(value);


  const valid =
    username.length >= 4 &&
    /^[a-zA-Z0-9_.]+$/.test(username);

  function handleChange(value: string) {
    setUsername(value);
    onChange?.(value);
  }

  return (
    <div className="space-y-2">

      <label className="text-sm font-semibold">
        Username
      </label>

      <div className="relative">

        <AtSign
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          value={username}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Choose a unique username"
          className="
          h-12
          w-full
          rounded-xl
          border
          border-border
          bg-background
          pl-11
          pr-11
          transition-all
          outline-none
          focus:border-[color:var(--synapse-accent-500)]
          focus:ring-4
          focus:ring-[color:var(--synapse-accent-500)]/10
          "
        />

        <div className="absolute right-4 top-1/2 -translate-y-1/2">

          {username.length > 0 &&
            (valid ? (
              <CheckCircle2
                size={20}
                className="text-green-500"
              />
            ) : (
              <CircleAlert
                size={20}
                className="text-orange-500"
              />
            ))}

        </div>

      </div>

      <div className="flex justify-between text-xs">

        <span className="text-muted-foreground">
          Letters, numbers, "." and "_"
        </span>

        <span className="text-muted-foreground">
          {username.length}/20
        </span>

      </div>

    </div>
  );
}