import { motion } from "framer-motion";

interface ToolButtonProps {
  icon: React.ReactNode;
  active?: boolean;
  tooltip: string;
  onClick: () => void;
}

export default function ToolButton({
  icon,
  active = false,
  tooltip,
  onClick,
}: ToolButtonProps) {
  return (
    <motion.button
      title={tooltip}
      onClick={onClick}
      className={`
      relative
      flex
      h-12
      w-12
      items-center
      justify-center
      rounded-2xl
      transition-all
      duration-200

      ${
        active
          ? "bg-[var(--synapse-accent-500)] text-white shadow-lg shadow-[color:var(--synapse-accent-500)]/30"
          : "bg-card hover:bg-accent text-muted-foreground"
      }
      `}
    >
      {icon}
    </motion.button>
  );
}