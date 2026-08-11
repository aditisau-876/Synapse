import { MessageCircle, Users, FileText } from "lucide-react";

export default function RightSidebar() {
  return (
    <aside
      className="
      flex
      h-full
      w-96
      flex-col
      border-l
      border-white/10
      bg-black/20
      backdrop-blur-xl
      "
    >
      <div className="border-b border-white/10 p-6">

        <h2 className="text-xl font-bold text-white">
          Meeting Tools
        </h2>

      </div>

      <div className="flex-1 space-y-4 p-6">

        <button className="flex w-full items-center gap-3 rounded-2xl bg-white/5 p-4 text-white transition hover:bg-[var(--synapse-accent-500)]">

          <MessageCircle />

          Chat

        </button>

        <button className="flex w-full items-center gap-3 rounded-2xl bg-white/5 p-4 text-white transition hover:bg-[var(--synapse-accent-500)]">

          <Users />

          Participants

        </button>

        <button className="flex w-full items-center gap-3 rounded-2xl bg-white/5 p-4 text-white transition hover:bg-[var(--synapse-accent-500)]">

          <FileText />

          Notes

        </button>

      </div>
    </aside>
  );
}