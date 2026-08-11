const people = [
  "You",
  "Alex",
  "Sarah",
  "Emily",
  "James",
  "Olivia",
];

export default function ScreenThumbnail() {
  return (
    <div
      className="
      flex
      gap-4
      overflow-x-auto
      py-5
      "
    >
      {people.map((person) => (
        <div
          key={person}
          className="
          h-28
          w-44
          shrink-0
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-slate-800
          "
        >
          <img
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${person}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}