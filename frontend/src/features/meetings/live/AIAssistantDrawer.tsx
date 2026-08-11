import MeetingSummary from "./MeetingSummary";
import ActionItems from "./ActionItems";
import TranscriptPanel from "./TranscriptPanel";
import AskAI from "./AskAI";

export default function AIAssistantDrawer() {
  return (
    <aside
      className="
      flex
      h-full
      w-[430px]
      flex-col
      gap-6
      overflow-y-auto
      border-l
      border-white/10
      bg-slate-950/95
      p-6
      backdrop-blur-2xl
      "
    >
      <MeetingSummary />

      <ActionItems />

      <TranscriptPanel />

      <AskAI />
    </aside>
  );
}