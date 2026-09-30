import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  id: string; name: string; email: string; phone: string | null; avatar?: string;
  emailVerified: boolean; phoneVerified: boolean; lastSeen?: string;
}

interface AuthState {
  user: User | null; accessToken: string | null; refreshToken: string | null; sessionId: string | null; isAuthenticated: boolean;
  login: (user: User, accessToken: string, refreshToken: string, sessionId?: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(persist((set) => ({
  user: null, accessToken: null, refreshToken: null, sessionId: null, isAuthenticated: false,
  login: (user, accessToken, refreshToken, sessionId) => set({ user, accessToken, refreshToken, sessionId: sessionId ?? null, isAuthenticated: true }),
  logout: () => set({ user: null, accessToken: null, refreshToken: null, sessionId: null, isAuthenticated: false }),
  updateUser: (updatedUser) => set((state) => ({ user: state.user ? { ...state.user, ...updatedUser } : null })),
}), { name: "synapse-session", storage: createJSONStorage(() => sessionStorage), partialize: (state) => ({ user: state.user, accessToken: state.accessToken, refreshToken: state.refreshToken, sessionId: state.sessionId, isAuthenticated: state.isAuthenticated }) }));
