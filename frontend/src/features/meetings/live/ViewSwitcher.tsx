import {
  LayoutGrid,
  Monitor,
} from "lucide-react";

interface Props {
  gallery: boolean;
  onToggle: () => void;
}

export default function ViewSwitcher({
  gallery,
  onToggle,
}: Props) {
  return (
    <button
      onClick={onToggle}
      className="
      flex
      items-center
      gap-2
      rounded-full
      bg-black/40
      px-4
      py-2
      text-white
      backdrop-blur-xl
      transition
      hover:bg-[var(--synapse-accent-500)]
      "
    >
      {gallery ? (
        <>
          <LayoutGrid size={18} />
          Gallery
        </>
      ) : (
        <>
          <Monitor size={18} />
          Speaker
        </>
      )}
    </button>
  );
}