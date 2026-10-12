import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserSettings {
  emailNotifications: boolean;
  desktopNotifications: boolean;
  messageNotifications: boolean;
  meetingNotifications: boolean;
  soundNotifications: boolean;
  notificationPreview: boolean;
  readReceipts: boolean;
  typingIndicators: boolean;
  onlineStatus: boolean;
  enterToSend: boolean;
  mediaAutoDownload: boolean;
  linkPreviews: boolean;
  theme: string;
  callNotifications: boolean;
  microphoneOnJoin: boolean;
  cameraOnJoin: boolean;
  autoDownloadFiles: boolean;
  storageLimit: string;
}

export const defaultSettings: UserSettings = {
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
  microphoneOnJoin: true,
  cameraOnJoin: true,
  autoDownloadFiles: true,
  storageLimit: "Unlimited",
};

interface SettingsStore {
  settings: UserSettings;
  updateSetting: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
}

/** Settings now persist on this device and are shared by every component that reads them. */
export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSetting: (key, value) =>
        set((state) => ({ settings: { ...state.settings, [key]: value } })),
    }),
    { name: "synapse-settings" },
  ),
);

export function useUserSettings() {
  const settings = useSettingsStore((s) => s.settings);
  const updateSetting = useSettingsStore((s) => s.updateSetting);
  return { settings, updateSetting };
}
