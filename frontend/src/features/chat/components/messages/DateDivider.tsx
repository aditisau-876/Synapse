export default function DateDivider({ label }: { label: string }) {
  return (
    <div className="my-4 flex justify-center">
      <span className="rounded-full bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs ring-1 ring-border">
        {label}
      </span>
    </div>
  );
}
