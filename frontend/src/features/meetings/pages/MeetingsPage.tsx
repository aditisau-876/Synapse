import MeetingHeader from "../components/MeetingHeader";
import MeetingFilters from "../components/MeetingFilters";
import MeetingStats from "../components/MeetingStats";
import MeetingQuickActions from "../components/MeetingQuickActions";
import MeetingList from "../components/MeetingList";

export default function MeetingsPage() {
  return (
    <div className="space-y-8 p-8">

      <MeetingHeader />

      <MeetingFilters />

      <MeetingStats />

      <MeetingQuickActions />

      <MeetingList />

    </div>
  );
}