interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function SettingsSection({
  title,
  description,
  children,
}: Props) {
  return (
    <section className="space-y-3">

      <div>
        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-border
          bg-card
        "
      >
        {children}
      </div>

    </section>
  );
}