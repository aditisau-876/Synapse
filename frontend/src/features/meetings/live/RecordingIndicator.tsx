export default function RecordingIndicator() {
  return (
    <div
      className="
      flex
      items-center
      gap-2
      rounded-full
      bg-red-600
      px-4
      py-2
      text-sm
      font-semibold
      text-white
      shadow-lg
      "
    >
      <div className="h-2 w-2 rounded-full bg-white animate-pulse" />

      REC

    </div>
  );
}