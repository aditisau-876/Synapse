import { motion } from "framer-motion";
import React from "react";

interface Props {
  icon: React.ElementType;
  active?: boolean;
  danger?: boolean;
  label: string;
  onClick?: () => void;
}

export default function ToolbarButton({
  icon: Icon,
  active = false,
  danger = false,
  label,
  onClick,
}: Props) {
  return (
    <motion.button
      onClick={onClick}
      title={label}
      className={`
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        transition-all
        duration-300

        ${
          danger
            ? "bg-red-600 text-white hover:bg-red-700"
            : active
            ? "bg-[var(--synapse-accent-500)] text-white shadow-xl"
            : "bg-white/10 text-white backdrop-blur-xl hover:bg-white/20"
        }
      `}
    >
      <Icon size={22} />
    </motion.button>
  );
}