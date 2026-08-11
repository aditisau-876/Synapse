import BackgroundEffects from "./BackgroundEffects";
import CameraPreview from "./CameraPreview";
import PreviewControls from "./PreviewControls";
import DeviceSelector from "./DeviceSelector";
import JoinMeetingCard from "./JoinMeetingCard";

export default function PreJoinPage() {
  return (
    <div
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-gradient-to-br
      from-slate-950
      via-[#17172b]
      to-[#231942]
      px-12
      py-10
      "
    >
      <BackgroundEffects />

      <div className="relative z-10 grid gap-10 lg:grid-cols-[2fr_1fr]">

        <div>

          <CameraPreview />

          <PreviewControls />

          <DeviceSelector />

        </div>

        <JoinMeetingCard />

      </div>

    </div>
  );
}