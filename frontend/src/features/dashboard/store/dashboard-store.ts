import { create } from "zustand";

interface DashboardStore {
  search: string;

  setSearch: (value: string) => void;

  notifications: number;

  setNotifications: (value: number) => void;
}

export const useDashboardStore =
create<DashboardStore>((set) => ({

  search: "",

  notifications: 3,

  setSearch: (search) =>
    set({
      search,
    }),

  setNotifications: (notifications) =>
    set({
      notifications,
    }),

}));