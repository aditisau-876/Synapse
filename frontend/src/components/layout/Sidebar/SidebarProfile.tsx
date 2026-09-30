import {
  ChevronUp,
  User,
} from "lucide-react";

interface Props {
  collapsed: boolean;
}

export default function SidebarProfile({
  collapsed,
}: Props) {
  return (
    <div className="border-t border-border p-4">

      <button
        className="
        flex
        w-full
        items-center
        rounded-2xl
        p-2
        transition
        hover:bg-muted
        "
      >
        <div
          className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-[var(--synapse-accent-700)]
          to-[var(--synapse-accent-secondary)]
          text-white
          "
        >
          <User size={20} />
        </div>

        {!collapsed && (
          <>
            <div className="ml-3 flex-1 text-left">

              <p className="font-semibold">
                Aditi
              </p>

              <p className="text-xs text-green-500">
                Online
              </p>

            </div>

            <ChevronUp size={18} />
          </>
        )}
      </button>

    </div>
  );
}