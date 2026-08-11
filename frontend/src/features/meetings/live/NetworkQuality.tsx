import {
  Wifi,
} from "lucide-react";

export default function NetworkQuality() {
  return (
    <div
      className="
      flex
      items-center
      gap-2
      rounded-full
      bg-white/10
      px-4
      py-2
      text-white
      backdrop-blur-xl
      "
    >
      <Wifi
        size={18}
        className="text-green-400"
      />

      Excellent
    </div>
  );
}