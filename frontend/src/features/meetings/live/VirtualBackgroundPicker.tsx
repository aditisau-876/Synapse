const backgrounds = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
    name: "Office",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    name: "Beach",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    name: "Cyber",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    name: "Workspace",
  },
];

interface Props {
  selected?: number;
  onSelect: (id: number) => void;
}

export default function VirtualBackgroundPicker({
  selected,
  onSelect,
}: Props) {
  return (
    <div
      className="
      w-[420px]
      rounded-3xl
      border
      border-white/10
      bg-slate-900/95
      p-6
      shadow-2xl
      backdrop-blur-2xl
      "
    >
      <h2 className="mb-5 text-xl font-bold text-white">
        Virtual Backgrounds
      </h2>

      <div className="grid grid-cols-2 gap-4">

        {backgrounds.map((background) => (

          <button
            key={background.id}
            onClick={() => onSelect(background.id)}
            className={`
            overflow-hidden
            rounded-2xl
            border-2
            transition

            ${
              selected === background.id
                ? "border-[color:var(--synapse-accent-500)]"
                : "border-transparent hover:border-[color:var(--synapse-accent-500)]"
            }
            `}
          >
            <img
              src={background.image}
              alt={background.name}
              className="h-36 w-full object-cover"
            />

            <div className="bg-slate-900 p-3 text-center text-sm text-white">
              {background.name}
            </div>

          </button>

        ))}

      </div>
    </div>
  );
}