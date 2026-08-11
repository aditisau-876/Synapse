import { ShieldCheck } from "lucide-react";

export default function ConnectionStatus() {
  return (
    <div
      className="
      flex
      items-center
      gap-2
      rounded-full
      bg-emerald-500/20
      px-4
      py-2
      text-emerald-300
      backdrop-blur-xl
      "
    >
      <ShieldCheck size={18} />

      Secure Connection
    </div>
  );
}