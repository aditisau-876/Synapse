interface Props {
  name: string;
  size?: number;
}

export default function AssigneeAvatar({
  name,
  size = 40,
}: Props) {
  return (
    <div
      title={name}
      style={{
        width: size,
        height: size,
      }}
      className="
      flex
      items-center
      justify-center
      rounded-full
      bg-gradient-to-br
      from-[var(--synapse-accent-500)]
      via-indigo-600
      to-cyan-500
      font-semibold
      text-white
      shadow-md
      ring-2
      ring-background
      "
    >
      {name.split(" ").map((word) => word[0]).slice(0, 2).join("").toUpperCase()}
    </div>
  );
}