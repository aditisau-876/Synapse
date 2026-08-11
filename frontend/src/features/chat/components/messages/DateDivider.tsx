interface Props {
  label: string;
}

export default function DateDivider({
  label,
}: Props) {
  return (
    <div className="my-6 flex justify-center">
      <div
        className="
        rounded-full
        bg-muted
        px-4
        py-1
        text-xs
        text-muted-foreground
        "
      >
        {label}
      </div>
    </div>
  );
}