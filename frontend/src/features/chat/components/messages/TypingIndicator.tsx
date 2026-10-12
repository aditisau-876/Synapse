/** Render only when someone is really typing; pass their first name. */
export default function TypingIndicator({ name }: { name: string }) {
  return (
    <div className="flex justify-start" role="status" aria-label={`${name} is typing`}>
      <div className="flex items-center gap-2 rounded-[14px] rounded-bl-[4px] border border-border bg-card px-3.5 py-2.5">
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
              style={{ animationDelay: `${i * 120}ms` }}
            />
          ))}
        </span>
        <span className="text-xs text-muted-foreground">{name} is typing</span>
      </div>
    </div>
  );
}
