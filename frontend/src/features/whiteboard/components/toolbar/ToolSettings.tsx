import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWhiteboard } from "../../hooks/useWhiteboard";

const COLORS = [
  "#000000",
  "#8b5cf6",
  "#6366f1",
  "#3b82f6",
  "#06b6d4",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#ffffff",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ToolSettings({
  open,
  onClose,
}: Props) {
  const {
    color,
    strokeWidth,
    setColor,
    setStrokeWidth,
  } = useWhiteboard();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: -20,
          }}
          className="
          absolute
          left-24
          top-2
          z-50
          w-72
          rounded-3xl
          border
          border-border
          bg-card/95
          p-5
          shadow-2xl
          backdrop-blur-xl
          "
        >
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-semibold">
              Tool Settings
            </h3>

            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-muted"
            >
              <X size={18} />
            </button>
          </div>

          <p className="mb-3 text-sm">
            Colors
          </p>

          <div className="mb-6 grid grid-cols-5 gap-3">
            {COLORS.map((item) => (
              <button
                key={item}
                onClick={() => setColor(item)}
                style={{
                  background: item,
                }}
                className={`
                h-10
                w-10
                rounded-full
                border-2
                transition

                ${
                  color === item
                    ? "border-[color:var(--synapse-accent-500)] scale-110"
                    : "border-border"
                }
                `}
              />
            ))}
          </div>

          <p className="mb-3 text-sm">
            Stroke
          </p>

          <input
            type="range"
            min={1}
            max={20}
            value={strokeWidth}
            onChange={(e) =>
              setStrokeWidth(
                Number(e.target.value)
              )
            }
            className="w-full accent-[var(--synapse-accent-500)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}