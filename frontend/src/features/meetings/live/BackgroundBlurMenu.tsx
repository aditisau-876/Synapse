import {
  Circle,
  Focus,
  Aperture,
} from "lucide-react";

interface Props {
  selected: string;
  onSelect: (value: string) => void;
}

const options = [
  {
    id: "none",
    label: "None",
    icon: Circle,
  },
  {
    id: "light",
    label: "Light Blur",
    icon: Focus,
  },
  {
    id: "heavy",
    label: "Heavy Blur",
    icon: Aperture,
  },
];

export default function BackgroundBlurMenu({
  selected,
  onSelect,
}: Props) {
  return (
    <div
      className="
      w-72
      rounded-3xl
      border
      border-white/10
      bg-slate-900/95
      p-5
      shadow-2xl
      backdrop-blur-2xl
      "
    >
      <h3 className="mb-5 text-lg font-bold text-white">
        Background Blur
      </h3>

      <div className="space-y-3">

        {options.map((item) => {

          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`
              flex
              w-full
              items-center
              gap-3
              rounded-2xl
              px-4
              py-3
              transition

              ${
                selected === item.id
                  ? "bg-[var(--synapse-accent-500)] text-white"
                  : "bg-white/5 text-white hover:bg-white/10"
              }
              `}
            >
              <Icon size={20} />

              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}