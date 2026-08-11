import { useDashboardStore } from "../store/dashboard-store";

import {
  recentChats,
  meetings,
  files,
  tasks,
  activities,
  team,
} from "../constants";

export function useDashboard() {

  const search =
    useDashboardStore(
      (state) => state.search
    );

  const notifications =
    useDashboardStore(
      (state) => state.notifications
    );

  const setSearch =
    useDashboardStore(
      (state) => state.setSearch
    );

  const setNotifications =
    useDashboardStore(
      (state) => state.setNotifications
    );

  return {

    search,

    notifications,

    setSearch,

    setNotifications,

    recentChats,

    meetings,

    files,

    tasks,

    activities,

    team,

  };

}