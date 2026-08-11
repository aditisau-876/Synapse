import { ChevronDown, User } from "lucide-react";

export default function UserMenu() {

  return (

    <button
      className="
      flex
      items-center
      gap-3
      rounded-xl
      px-3
      py-2
      hover:bg-muted
      transition
      "
    >

      <div
        className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        bg-gradient-to-br
        from-indigo-500
        to-cyan-500
        text-white
        "
      >

        <User size={18} />

      </div>

      <div className="hidden text-left lg:block">

        <p className="text-sm font-semibold">
          Aditi
        </p>

        <p className="text-xs text-muted-foreground">
          Online
        </p>

      </div>

      <ChevronDown
        size={18}
        className="hidden lg:block"
      />

    </button>

  );

}