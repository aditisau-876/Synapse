import {
  Plus,
  MessageCircleMore,
} from "lucide-react";

export default function ConversationHeader() {
  return (
    <div
className="
flex
items-center
justify-between

border-b
border-border

px-5
py-5
"
>
      <div className="flex items-center gap-3">
        <div
          className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl

          bg-gradient-to-br from-[var(--synapse-accent-600)]
to-[var(--synapse-accent-300)]

          text-white
          "
        >
          <MessageCircleMore size={20} />
        </div>

        <div>
          <h2 className="text-lg font-bold">
            Chats
          </h2>

          <p className="text-sm text-muted-foreground">
            Your conversations
          </p>
        </div>
      </div>

      <button
        className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        transition

        hover:bg-muted
        "
      >
        <Plus size={20} />
      </button>
    </div>
  );
}