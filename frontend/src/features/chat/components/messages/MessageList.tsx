import { motion } from "framer-motion";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

import { useChat } from "../../hooks/useChat";

export default function MessageList() {

  const { messages } = useChat();

  return (

    <div
      className="
      relative
      flex-1
      overflow-y-auto
      px-8
      py-8
      "
    >

      {/* subtle wallpaper */}

      <div
        className="
        pointer-events-none
        absolute
        inset-0
        opacity-[0.04]

        dark:opacity-[0.03]

        [background-image:radial-gradient(circle_at_1px_1px,var(--synapse-accent)_1px,transparent_0)]
        [background-size:34px_34px]
        "
      />

      <div className="relative z-10 space-y-5">

        {messages.map((message) => (

          <motion.div

            key={message.id}

            initial={{
              opacity:0,
              y:15,
              scale:0.97
            }}

            animate={{
              opacity:1,
              y:0,
              scale:1
            }}

            transition={{
              duration:.22
            }}

          >

            <MessageBubble
              message={message}
            />

          </motion.div>

        ))}

        <TypingIndicator/>

      </div>

    </div>

  );

}