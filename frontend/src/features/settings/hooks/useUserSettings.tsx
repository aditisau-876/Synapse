import { useState } from "react";

export function useUserSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    desktopNotifications: true,
    messageNotifications: true,
    meetingNotifications: true,

    soundNotifications: true,
    notificationPreview: true,

    readReceipts: true,
    typingIndicators: true,
    onlineStatus: true,

    enterToSend: true,
    mediaAutoDownload: true,
    linkPreviews: true,

    theme: "system",

    callNotifications: true,
    microphoneOnJoin: false,
    cameraOnJoin: false,

    autoDownloadFiles: true,
    storageLimit: "Unlimited",
  });

  const updateSetting = <K extends keyof typeof settings>(
    key: K,
    value: (typeof settings)[K]
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return {
    settings,
    updateSetting,
  };
}