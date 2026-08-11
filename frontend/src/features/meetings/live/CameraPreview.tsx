interface Props {
  name: string;
}

export default function CameraPreview({
  name,
}: Props) {
  return (
    <div
      className="
      fixed
      bottom-32
      right-8
      z-40
      h-52
      w-72
      overflow-hidden
      rounded-3xl
      border
      border-[var(--synapse-accent-500)]/30
      bg-slate-900
      shadow-2xl
      "
    >
      <img
        src={`https://api.dicebear.com/9.x/initials/svg?seed=${name}`}
        className="h-full w-full object-cover"
      />

      <div
        className="
        absolute
        bottom-3
        left-3
        rounded-full
        bg-black/50
        px-3
        py-1
        text-sm
        text-white
        "
      >
        {name}
      </div>
    </div>
  );
}