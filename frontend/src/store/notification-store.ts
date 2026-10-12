import { create } from "zustand";

export interface AppNotification {
  id: string;
  kind: "message" | "meeting" | "system";
  title: string;
  body: string;
  createdAt: number;
  read: boolean;
  href?: string;
}

interface NotificationState {
  items: AppNotification[];
  push: (n: Omit<AppNotification, "id" | "createdAt" | "read">) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
  clear: () => void;
}

/** Features push into this; the bell in the topbar reads from it. */
export const useNotificationStore = create<NotificationState>((set) => ({
  items: [],
  push: (n) =>
    set((s) => ({
      items: [
        { ...n, id: crypto.randomUUID(), createdAt: Date.now(), read: false },
        ...s.items,
      ].slice(0, 30),
    })),
  markAllRead: () => set((s) => ({ items: s.items.map((i) => ({ ...i, read: true })) })),
  markRead: (id) =>
    set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, read: true } : i)) })),
  clear: () => set({ items: [] }),
}));
