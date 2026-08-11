import { MessageCircleMore } from "lucide-react";

interface Props {
  collapsed: boolean;
}

export default function SidebarLogo({ collapsed }: Props) {
  return (
    <div className="flex items-center gap-3 border-b border-border px-6 py-6">
      <div
        className="
        flex
        h-11
        w-11
        shrink-0
        items-center
        justify-center
        rounded-2xl
        bg-gradient-to-br
        from-[var(--synapse-accent-700)]
via-[var(--synapse-accent-500)]
to-[var(--synapse-accent-700)]
        text-white
        shadow-lg
      "
      >
        <MessageCircleMore size={22} />
      </div>

      {!collapsed && (
        <div className="overflow-hidden">
          <h2 className="text-lg font-black tracking-tight">
            Synapse
          </h2>

          <p className="text-xs text-muted-foreground">
            Connect. Meet. Collaborate.
          </p>
        </div>
      )}
    </div>
  );
}