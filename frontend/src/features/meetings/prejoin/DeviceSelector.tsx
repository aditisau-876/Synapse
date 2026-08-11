export default function DeviceSelector() {
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-3">

      <select className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white">
        <option>Microphone</option>
      </select>

      <select className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white">
        <option>Camera</option>
      </select>

      <select className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white">
        <option>Speaker</option>
      </select>

    </div>
  );
}