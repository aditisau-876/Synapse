const media = [
  "https://picsum.photos/200?1",
  "https://picsum.photos/200?2",
  "https://picsum.photos/200?3",
  "https://picsum.photos/200?4",
  "https://picsum.photos/200?5",
  "https://picsum.photos/200?6",
];

export default function SharedMedia() {
  return (
    <div className="border-b border-border p-6">

      <div className="mb-4 flex items-center justify-between">

        <h3 className="font-semibold">
          Shared Media
        </h3>

        <button className="text-sm text-[var(--synapse-accent-500)]">
          View all
        </button>

      </div>

      <div className="grid grid-cols-3 gap-3">

        {media.map((image) => (
          <img
            key={image}
            src={image}
            alt=""
            className="aspect-square rounded-xl object-cover transition hover:scale-105"
          />
        ))}

      </div>

    </div>
  );
}