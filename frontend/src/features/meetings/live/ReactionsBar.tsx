const reactions = [
  "👍",
  "👏",
  "❤️",
  "🎉",
  "😂",
  "🔥",
];

export default function ReactionsBar() {
  return (
    <div
      className="
      absolute
      right-8
      top-40
      z-40
      flex
      flex-col
      gap-3
      rounded-3xl
      border
      border-white/10
      bg-black/40
      p-3
      backdrop-blur-xl
      "
    >
      {reactions.map((reaction) => (
        <button
          key={reaction}
          className="
          text-2xl
          transition
          
          "
        >
          {reaction}
        </button>
      ))}
    </div>
  );
}