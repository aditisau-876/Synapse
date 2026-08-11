import MessageComposer from "@/features/chat/components/composer/MessageComposer";

const messages = [

  {
    id: 1,
    sender: "Alex",
    text: "Can everyone hear me?",
  },

  {
    id: 2,
    sender: "Sarah",
    text: "Yes 👍",
  },

  {
    id: 3,
    sender: "Emily",
    text: "Let's begin.",
  },

];

export default function ChatPanel() {
  return (
    <div className="flex h-full flex-col">

      <div className="border-b border-white/10 p-5">

        <h2 className="font-bold text-white">
          Meeting Chat
        </h2>

      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-5">

        {messages.map((message) => (

          <div key={message.id}>

            <p className="text-xs text-[var(--synapse-accent-300)]">
              {message.sender}
            </p>

            <div className="mt-1 rounded-2xl bg-white/10 p-3 text-white">
              {message.text}
            </div>

          </div>

        ))}

      </div>

      <MessageComposer />

    </div>
  );
}