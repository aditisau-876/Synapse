import WhiteboardHeader from "../components/panels/WhiteboardHeader";
import WhiteboardCanvas from "../components/canvas/WhiteboardCanvas";
import FloatingToolbar from "../components/toolbar/FloatingToolbar";
import CollaboratorsBar from "../components/panels/CollaboratorsBar";
import ZoomControls from "../components/viewport/ZoomControls";
import MiniMap from "../components/viewport/MiniMap";

export default function WhiteboardPage() {
  return (
    <div
      className="
      flex
      h-screen
      flex-col
      overflow-hidden
      bg-background
      text-foreground
      "
    >
      <WhiteboardHeader />

      <main
        className="
        relative
        flex-1
        overflow-hidden
        "
      >
        <WhiteboardCanvas />

        <FloatingToolbar />

        <CollaboratorsBar />

        <ZoomControls />

        <MiniMap />
      </main>
    </div>
  );
}