import { SendHorizontal } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  disabled: boolean;
  onClick: () => void;
}

export default function SendButton({
  disabled,
  onClick,
}: Props) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      disabled={disabled}
      onClick={onClick}
      className="
      flex
      h-11
      w-11
      items-center
      justify-center
      rounded-xl
      bg-[var(--synapse-accent-500)]
      text-white
      shadow-lg
      transition
      disabled:cursor-not-allowed
      disabled:opacity-50
      "
    >
      <SendHorizontal size={19} />
    </motion.button>
  );
}