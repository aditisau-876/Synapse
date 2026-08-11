import { useState } from "react";

import MeetingHeader from "./MeetingHeader";
import RightSidebar from "./RightSidebar";

import FloatingToolbar from "../live/FloatingToolbar";
import GalleryView from "../live/GalleryView";
import SpeakerView from "../live/SpeakerView";
import ScreenShareView from "../live/ScreenShareView";
import ViewSwitcher from "../live/ViewSwitcher";

export default function MeetingRoom() {

  const [showSidebar] = useState(true);

  const [view, setView] = useState<
    "gallery" | "speaker" | "share"
  >("gallery");

  return (

    <div
      className="
      flex
      h-screen
      overflow-hidden
      bg-gradient-to-br
      from-slate-950
      via-[#17172b]
      to-[#231942]
      "
    >

      {/* Main Meeting */}

      <div className="relative flex flex-1 flex-col">

        <MeetingHeader />

        {/* View Switcher */}

        <div className="absolute right-8 top-24 z-30">

          <ViewSwitcher
            gallery={view === "gallery"}
            onToggle={() =>
              setView(
                view === "gallery"
                  ? "speaker"
                  : "gallery"
              )
            }
          />

        </div>

        {/* Meeting Layout */}

        <div className="flex-1 overflow-hidden">

          {view === "gallery" && (
            <GalleryView />
          )}

          {view === "speaker" && (
            <SpeakerView />
          )}

          {view === "share" && (
            <ScreenShareView />
          )}

        </div>

        {/* Floating Controls */}

        <FloatingToolbar />

      </div>

      {/* Right Sidebar */}

      {showSidebar && (
        <RightSidebar />
      )}

    </div>

  );

}