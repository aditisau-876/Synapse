import WelcomeBanner from "../components/WelcomeBanner";
import DashboardStats from "../components/DashboardStats";
import QuickActions from "../components/QuickActions";

import ContinueWorking from "../components/ContinueWorking";
import AIAssistantCard from "../components/AIAssistantCard";

import RecentChats from "../components/RecentChats";
import UpcomingMeetings from "../components/UpcomingMeetings";

import ActiveTasks from "../components/ActiveTasks";
import RecentFiles from "../components/RecentFiles";

import TeamOnline from "../components/TeamOnline";
import ActivityFeed from "../components/ActivityFeed";

import WorkspaceOverview from "../components/WorkspaceOverview";
import ProductivityChart from "../components/ProductivityChart";

import CalendarWidget from "../components/CalendarWidget";
import NotificationWidget from "../components/NotificationWidget";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        <WelcomeBanner />

        <DashboardStats />

        <QuickActions />

        <div className="grid gap-6 lg:grid-cols-2">
          <ContinueWorking />
          <AIAssistantCard />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <RecentChats />
          <UpcomingMeetings />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ActiveTasks />
          <RecentFiles />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <TeamOnline />
          <ActivityFeed />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <WorkspaceOverview />
          <ProductivityChart />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <CalendarWidget />
          <NotificationWidget />
        </div>

      </div>
    </div>
  );
}