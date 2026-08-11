import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

      {/* Grid */}
      <div
        className="
        absolute inset-0
        bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),
        linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)]
        bg-[size:40px_40px]
        "
      />

      {/* Indigo Glow */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        left-[-10%]
        top-[10%]
        h-[500px]
        w-[500px]
        rounded-full
        bg-indigo-500/20
        blur-[150px]
        "
      />


      {/* Cyan Glow */}
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        right-[-10%]
        top-[30%]
        h-[450px]
        w-[450px]
        rounded-full
        bg-cyan-400/20
        blur-[150px]
        "
      />


      {/* Bottom Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="
        absolute
        bottom-[-10%]
        left-[40%]
        h-[400px]
        w-[400px]
        rounded-full
        bg-purple-500/20
        blur-[160px]
        "
      />

    </div>
  );
}