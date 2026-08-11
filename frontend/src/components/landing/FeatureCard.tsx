import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Props {
  icon: React.ElementType;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: Props) {

  const { ref, inView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 50,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      whileHover={{
        y: -12,
        scale: 1.03,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-background/60
        p-7
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-indigo-500/40
      "
    >

      {/* Hover Glow */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-0
          transition
          duration-500
          group-hover:opacity-100
          bg-gradient-to-br
          from-indigo-500/20
          via-cyan-500/10
          to-transparent
        "
      />


      <div className="relative z-10">

        {/* Icon */}
        <motion.div
          whileHover={{
            rotate: 8,
          }}
          transition={{
            duration: 0.2,
          }}
          className="
            mb-6
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-indigo-500
            to-cyan-500
            text-white
            shadow-lg
            shadow-indigo-500/20
          "
        >
          <Icon className="size-7" />
        </motion.div>


        {/* Title */}
        <h3 className="mb-3 text-xl font-bold">
          {title}
        </h3>


        {/* Description */}
        <p className="leading-7 text-muted-foreground">
          {description}
        </p>


        {/* Link */}
        <div
          className="
            mt-6
            flex
            items-center
            gap-2
            font-medium
            text-[var(--synapse-accent-500)]
          "
        >
          Learn More

          <ArrowUpRight
            className="
              size-4
              transition-transform
              duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          />

        </div>


      </div>

    </motion.div>
  );
}