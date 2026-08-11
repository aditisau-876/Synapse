import { CameraOff } from "lucide-react";

export default function CameraPreview() {
  return (
    <div
      className="
      relative
      aspect-video
      overflow-hidden
      rounded-[36px]
      border
      border-white/10
      bg-gradient-to-br
      from-slate-800
      to-slate-900
      shadow-2xl
      "
    >
      <img
        src="https://api.dicebear.com/9.x/initials/svg?seed=You"
        className="h-full w-full object-cover"
      />

      <div
        className="
        absolute
        bottom-5
        right-5
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        bg-black/60
        backdrop-blur-xl
        "
      >
        <CameraOff className="text-white" />
      </div>
    </div>
  );
}