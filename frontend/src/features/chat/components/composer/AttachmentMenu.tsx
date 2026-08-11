import {
  Camera,
  FileText,
  Image,
  MapPin,
  UserRound,
  Music,
  BarChart3,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
}

const actions = [
  {
    label: "Camera",
    icon: Camera,
    color: "bg-red-500",
  },
  {
    label: "Images",
    icon: Image,
    color: "bg-purple-500",
  },
  {
    label: "Documents",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    label: "Location",
    icon: MapPin,
    color: "bg-green-500",
  },
  {
    label: "Contact",
    icon: UserRound,
    color: "bg-cyan-500",
  },
  {
    label: "Audio",
    icon: Music,
    color: "bg-orange-500",
  },
  {
    label: "Poll",
    icon: BarChart3,
    color: "bg-pink-500",
  },
];

export default function AttachmentMenu({
  open,
  onClose,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            className="
            absolute
            bottom-20
            left-3
            z-50
            w-72
            rounded-3xl
            border
            border-border
            bg-background/95
            p-5
            shadow-2xl
            backdrop-blur-2xl
            "
          >
            <div className="grid grid-cols-3 gap-4">
              {actions.map((item) => (
                <button
                  key={item.label}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    text-white
                    ${item.color}
                    `}
                  >
                    <item.icon size={24} />
                  </div>

                  <span className="text-xs">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}