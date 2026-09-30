interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

export default function OTPInput({ value = "", onChange }: Props) {
  return (
    <div className="flex justify-between gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          inputMode="numeric"
          maxLength={1}
          value={value[index] ?? ""}
          aria-label={`Verification digit ${index + 1}`}
          onChange={(event) => {
            const digit = event.target.value.replace(/\D/g, "").slice(-1);
            const next = value.split("");
            next[index] = digit;
            onChange?.(next.join("").slice(0, 6));
          }}
          className="
            h-12 w-12 rounded-xl border border-border bg-background text-center text-xl font-bold
            text-foreground outline-none transition focus:border-[var(--synapse-accent-500)]
            focus:ring-4 focus:ring-[var(--synapse-accent-500)]/10
          "
        />
      ))}
    </div>
  );
}
