import ScreenThumbnail from "./ScreenThumbnail";

export default function ScreenShareView() {
  return (
    <div className="flex flex-1 flex-col p-6">

      <div
        className="
        relative
        flex-1
        overflow-hidden
        rounded-[30px]
        border
        border-white/10
        bg-black
        shadow-2xl
        "
      >
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600"
          className="h-full w-full object-cover"
        />

        <div
          className="
          absolute
          left-6
          top-6
          rounded-full
          bg-gradient-to-r
          from-[var(--synapse-accent-500)]
          to-indigo-600
          px-5
          py-2
          text-sm
          font-semibold
          text-white
          shadow-xl
          "
        >
          Alex is presenting
        </div>
      </div>

      <ScreenThumbnail />
    </div>
  );
}