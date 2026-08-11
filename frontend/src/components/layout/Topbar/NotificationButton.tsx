import { Bell } from "lucide-react";

export default function NotificationButton() {

  return (

    <button
      className="
      relative
      flex
      h-11
      w-11
      items-center
      justify-center
      rounded-xl
      hover:bg-muted
      transition
      "
    >

      <Bell size={20} />

      <span
        className="
        absolute
        right-2
        top-2
        h-2.5
        w-2.5
        rounded-full
        bg-red-500
        "
      />

    </button>

  );

}