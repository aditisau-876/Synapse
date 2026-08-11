import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">

      <div
        className="
        flex
        items-center
        gap-3
        rounded-3xl
        rounded-bl-md
        border
        border-[var(--synapse-accent-500)]/20
        bg-white/80
        px-5
        py-3
        shadow-md
        backdrop-blur-xl
        dark:border-white/10
        dark:bg-white/5
        "
      >

        <div className="flex gap-1">

          {[0,1,2].map((i)=>(

            <motion.div
              key={i}
              animate={{
                y:[0,-4,0],
                opacity:[0.5,1,0.5]
              }}
              transition={{
                repeat:Infinity,
                duration:.8,
                delay:i*.15
              }}
              className="
              h-2
              w-2
              rounded-full
              bg-[var(--synapse-accent-500)]
              "
            />

          ))}

        </div>

        <span
          className="
          text-sm
          italic
          text-[var(--synapse-accent-500)]
          dark:text-[var(--synapse-accent-500)]
          "
        >
          Alex is typing...
        </span>

      </div>

    </div>
  );
}