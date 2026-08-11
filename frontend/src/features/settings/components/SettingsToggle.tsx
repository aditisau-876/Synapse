interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export default function SettingsToggle({
  checked,
  onChange,
  disabled = false,
}: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative
        h-6
        w-11
        shrink-0
        rounded-full
        transition-colors
        ${
          checked
            ? "bg-[var(--synapse-accent-500)]"
            : "bg-muted-foreground/30"
        }
        ${disabled ? "cursor-not-allowed opacity-50" : ""}
      `}
      aria-pressed={checked}
    >
      <span
        className={`
          absolute
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          rounded-full
          bg-white
          shadow-sm
          transition-transform
          ${
            checked
              ? "translate-x-6"
              : "translate-x-1"
          }
        `}
      />
    </button>
  );
}