import { useState } from "react";

import SettingsSidebar from "../components/SettingsSidebar";

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

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("Profile");

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">

        <SettingsSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}/>

        <main className="min-w-0 flex-1 p-6 lg:p-8">
          <div className="mx-auto max-w-4xl">
            {activeSection === "Profile" && (<ProfileSettingsPage />)}
            {activeSection === "Account" && (<AccountSettingsPage />)}
            {activeSection === "Privacy" && (<PrivacySecurityPage />)}
            {activeSection === "Notifications" && (<NotificationSettingsPage />)}
            {activeSection === "Appearance" && (<AppearanceSettingsPage />)}
            {activeSection === "Chats" && (<ChatSettingsPage />)}
            {activeSection === "Calls" && (<MeetingSettingsPage />)}
            {activeSection === "Storage" && (<StorageSettingsPage />)}
            {activeSection === "Sessions" && (<SessionsSettingsPage />)}
            {activeSection === "Help" && (<HelpSettingsPage />)}
          </div>
        </main>
      </div>
    </div>
  );
}