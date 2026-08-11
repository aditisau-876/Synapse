import { motion } from "framer-motion";
import {
  Mic,
  MicOff,
  Video,
  MonitorUp,
  Users,
} from "lucide-react";

export default function MeetingCard() {
  return (
    <motion.div
      animate={{ y: [0, 12, 0] }}
      transition={{ duration: 6, repeat: Infinity }}
      className="w-96 rounded-3xl border border-white/10 bg-background/70 p-5 shadow-2xl backdrop-blur-xl"
    >
      <div className="mb-4 flex items-center justify-between">

        <h3 className="font-semibold">
          Team Sprint Meeting
        </h3>

        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-400">
          Live
        </span>

      </div>

      <div className="grid grid-cols-2 gap-3">

        {[1,2,3,4].map((i)=>(
          <div
            key={i}
            className="aspect-video rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900"
          />
        ))}

      </div>

      <div className="mt-5 flex justify-center gap-3">

        <div className="rounded-full bg-muted p-3">
          <Mic className="size-5"/>
        </div>

        <div className="rounded-full bg-rose-500 p-3 text-white">
          <MicOff className="size-5"/>
        </div>

        <div className="rounded-full bg-muted p-3">
          <Video className="size-5"/>
        </div>

        <div className="rounded-full bg-muted p-3">
          <MonitorUp className="size-5"/>
        </div>

        <div className="rounded-full bg-muted p-3">
          <Users className="size-5"/>
        </div>

      </div>
    </motion.div>
  );
}