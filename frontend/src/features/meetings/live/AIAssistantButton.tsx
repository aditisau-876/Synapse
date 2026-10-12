import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  active?: boolean;
  onClick?: () => void;
}

export default function AIAssistantButton({
  active = false,
  onClick,
}: Props) {
  return (
    <motion.button
      onClick={onClick}
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
          active
            ? "bg-[var(--synapse-accent-500)] text-white shadow-xl"
            : "bg-white/10 text-white hover:bg-[var(--synapse-accent-500)] backdrop-blur-xl"
        }
      `}
    >
      <Sparkles size={22} />
    </motion.button>
  );
}