import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Video } from "lucide-react";
import { toast } from "sonner";

import SearchBar from "./SearchBar";
import NotificationButton from "../Notifications/NotificationButton";
import UserMenu from "../UserMenu/UserMenu";
import { LogoMark } from "@/components/landing/Logo";
import { Button } from "@/components/ui/button";
import { instantMeeting } from "@/features/meetings/services";
import { getErrorMessage } from "@/lib/errors";

export default function Topbar() {
  const navigate = useNavigate();
  const [starting, setStarting] = useState(false);

  const meetNow = async () => {
    setStarting(true);
    try {
      const meeting = await instantMeeting();
      navigate(`/app/meetings/${meeting.code}`);
    } catch (error) {
      toast.error(getErrorMessage(error, "Couldn't start a meeting."));
    } finally {
      setStarting(false);
    }
  };

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card px-3 md:px-5">
      <div className="md:hidden">
        <LogoMark className="size-8" />
      </div>

      <div className="min-w-0 flex-1">
        <SearchBar />
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <Button onClick={() => void meetNow()} disabled={starting} className="hidden sm:inline-flex">
          <Video />
          {starting ? "Starting…" : "Meet now"}
        </Button>
        <Button
          size="icon"
          onClick={() => void meetNow()}
          disabled={starting}
          aria-label="Meet now"
          className="sm:hidden"
        >
          <Video />
        </Button>
        <NotificationButton />
        <UserMenu />
      </div>
    </header>
  );
}
