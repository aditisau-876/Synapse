import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function WelcomeBanner() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-[var(--synapse-accent-300)]/20

        bg-gradient-to-br
        from-[var(--synapse-accent-700)]
        via-indigo-700
        to-slate-900

        p-8
        text-white
        shadow-2xl
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-64
          w-64
          rounded-full
          bg-[var(--synapse-accent-500)]/20
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          left-1/3
          h-56
          w-56
          rounded-full
          bg-indigo-400/10
          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
        "
      >
        <div>
          <p className="text-lg text-[var(--synapse-accent-100)]">
            {greeting},
          </p>

          <h1
            className="
              mt-2
              text-4xl
              font-black
              text-white
            "
          >
            Aditi 👋
          </h1>

          <p
            className="
              mt-3
              max-w-xl
              text-[var(--synapse-accent-100)]
            "
          >
            Welcome back to Synapse.

            Let's build something amazing today.
          </p>
        </div>

        <div
          className="
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            bg-white/10
            backdrop-blur-xl
            ring-1
            ring-white/10
          "
        >
          <Sparkles
            size={42}
            className="text-yellow-300"
          />
        </div>
      </div>
    </motion.div>
  );
}