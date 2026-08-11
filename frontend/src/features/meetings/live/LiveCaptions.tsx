import CaptionBubble from "./CaptionBubble";

export default function LiveCaptions() {
  return (
    <div
      className="
      pointer-events-none
      absolute
      bottom-28
      left-1/2
      z-40
      -translate-x-1/2
      "
    >
      <CaptionBubble
        speaker="Alex"
        message="Let's finalize the dashboard before tomorrow."
      />
    </div>
  );
}