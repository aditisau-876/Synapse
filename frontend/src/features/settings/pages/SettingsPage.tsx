import { useNavigate, useParams } from "react-router-dom";
import SettingsSidebar, { settingsItems } from "../components/SettingsSidebar";
import ProfileSettingsPage from "./ProfileSettingsPage";
import AccountSettingsPage from "./AccountSettingsPage";
import PrivacySecurityPage from "./PrivacySecurityPage";
import NotificationSettingsPage from "./NotificationSettingsPage";
import AppearanceSettingsPage from "./AppearanceSettingsPage";
import ChatSettingsPage from "./ChatSettingsPage";
import MeetingSettingsPage from "./MeetingSettingsPage";
import StorageSettingsPage from "./StorageSettingsPage";
import SessionsSettingsPage from "./SessionsSettingsPage";
import HelpSettingsPage from "./HelpSettingsPage";

const pages: Record<string, React.ReactNode> = {
  Profile: <ProfileSettingsPage />,
  Account: <AccountSettingsPage />,
  Privacy: <PrivacySecurityPage />,
  Notifications: <NotificationSettingsPage />,
  Appearance: <AppearanceSettingsPage />,
  Chats: <ChatSettingsPage />,
  Calls: <MeetingSettingsPage />,
  Storage: <StorageSettingsPage />,
  Sessions: <SessionsSettingsPage />,
  Help: <HelpSettingsPage />,
};

/** The section lives in the URL (/app/settings/appearance) so it can be linked and survives Back. */
export default function SettingsPage() {
  const { section } = useParams();
  const navigate = useNavigate();

  const active =
    settingsItems.find((i) => i.label.toLowerCase() === section?.toLowerCase())?.label ?? "Profile";

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 lg:flex-row lg:gap-10 lg:px-8 lg:py-8">
      <SettingsSidebar
        activeSection={active}
        setActiveSection={(label) => navigate(`/app/settings/${label.toLowerCase()}`)}
      />
      <div className="min-w-0 flex-1">{pages[active]}</div>
    </div>
  );
}
