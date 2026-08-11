import { useState } from "react";

import SettingsSidebar from "./SettingsSidebar";

import ProfileSettingsPage from "../pages/ProfileSettingsPage";
import AccountSettingsPage from "../pages/AccountSettingsPage";
import PrivacySecurityPage from "../pages/PrivacySecurityPage";
import AppearanceSettingsPage from "../pages/AppearanceSettingsPage";
import ChatSettingsPage from "../pages/ChatSettingsPage";
import HelpSettingsPage from "../pages/HelpSettingsPage";
import MeetingSettingsPage from "../pages/MeetingSettingsPage";
import NotificationSettingsPage from "../pages/NotificationSettingsPage";
import SessionsSettingsPage from "../pages/SessionsSettingsPage";
import StorageSettingsPage from "../pages/StorageSettingsPage";

export default function SettingsLayout() {
  const [activeSection, setActiveSection] = useState("Profile");

  return (
    <div className="min-h-full bg-background">
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[1450px]
          px-6
          py-6
          lg:px-8
        "
      >
        {/* Settings Sidebar */}
        <SettingsSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Settings Content */}
        <main
          className="
            min-w-0
            flex-1
            pl-8
            lg:pl-10
            xl:pl-12
          "
        >
          <div className="mx-auto w-full max-w-[950px]">
            {activeSection === "Profile" && (
              <ProfileSettingsPage />
            )}

            {activeSection === "Account" && (
              <AccountSettingsPage />
            )}

            {activeSection === "Privacy" && (
              <PrivacySecurityPage />
            )}

            {activeSection === "Appearance" && (
              <AppearanceSettingsPage />
            )}

            {activeSection === "Chats" && (
              <ChatSettingsPage />
            )}

            {activeSection === "Help" && (
              <HelpSettingsPage />
            )}

            {activeSection === "Calls" && (
              <MeetingSettingsPage />
            )}

            {activeSection === "Notifications" && (
              <NotificationSettingsPage />
            )}

            {activeSection === "Sessions" && (
              <SessionsSettingsPage />
            )}

            {activeSection === "Storage" && (
              <StorageSettingsPage />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}