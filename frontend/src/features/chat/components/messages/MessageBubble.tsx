import type { Message } from "../../types/chat";
import ReadReceipt from "./ReadReceipt";

interface Props {
  message: Message;
}

export default function MessageBubble({
  message,
}: Props) {
  return (
    <div
      className={`
        flex
        ${message.own ? "justify-end" : "justify-start"}
      `}
    >
      <div
        className={`
          relative
          max-w-[70%]

          rounded-3xl

          px-5
          py-3

          shadow-md

          transition-all
          duration-200

          ${
            message.own
              ? `
                rounded-br-lg

                bg-gradient-to-r
                from-[var(--synapse-accent-600)]
to-[var(--synapse-accent-300)]

                text-white

                shadow-[var(--synapse-accent-500)]/40
              `
              : `
                rounded-bl-lg

                border
                border-[var(--synapse-accent-500)]/60

                bg-card
                text-card-foreground

                shadow-sm
              `
          }
        `}
      >
        <p
          className="
            whitespace-pre-wrap
            break-words

            text-[15px]
            leading-7
          "
        >
          {message.text}
        </p>

        <div
          className="
            mt-2

            flex
            items-center
            justify-end
            gap-2

            text-[11px]
            opacity-70
          "
        >
          <span>
            {message.createdAt}
          </span>

          {message.own && (
            <ReadReceipt
              status={message.status}
            />
          )}
        </div>
      </div>
    </div>
  );
}