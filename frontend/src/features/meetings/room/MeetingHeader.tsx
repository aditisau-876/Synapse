import {
  Shield,
  Lock,
} from "lucide-react";

import RecordingIndicator from "../live/RecordingIndicator";
import MeetingTimer from "../live/MeetingTimer";
import ConnectionStatus from "../live/ConnectionStatus";
import NetworkQuality from "../live/NetworkQuality";

export default function MeetingHeader() {

  return (

    <header
      className="
      flex
      items-center
      justify-between
      border-b
      border-white/10
      px-8
      py-5
      "
    >

      <div>

        <h2 className="text-xl font-bold text-white">
          Design Sprint Meeting
        </h2>

        <p className="text-sm text-white/60">
          Meeting ID • 8HJ2-K91-QWE
        </p>

      </div>

      <div className="flex items-center gap-4">

        <RecordingIndicator />

        <MeetingTimer />

        <ConnectionStatus />

        <NetworkQuality />

        <Shield
          size={18}
          className="text-white/60"
        />

        <Lock
          size={18}
          className="text-white/60"
        />

      </div>

    </header>

  );

}