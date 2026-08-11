import {
  Mic,
  Video,
  Monitor,
  Settings2,
} from "lucide-react";

const controls = [
  Mic,
  Video,
  Monitor,
  Settings2,
];

export default function PreviewControls() {
  return (
    <div className="mt-8 flex justify-center gap-5">

      {controls.map((Icon, index) => (

        <button
          key={index}
          className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-white/10
          text-white
          backdrop-blur-xl
          transition
          hover:scale-110
          hover:bg-[var(--synapse-accent-500)]
          "
        >
          <Icon size={22} />
        </button>

      ))}

    </div>
  );
}