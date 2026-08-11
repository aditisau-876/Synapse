import { create } from "zustand";

export interface User {

  id: string;

  name: string;

  email: string;

  phone: string;

  avatar?: string;

  emailVerified: boolean;

  phoneVerified: boolean;

  lastSeen?: string;

}

interface AuthState {

  user: User | null;

  accessToken: string | null;

  refreshToken: string | null;

  isAuthenticated: boolean;

  login: (
    user: User,
    accessToken: string,
    refreshToken: string
  ) => void;

  logout: () => void;

  updateUser: (
    user: Partial<User>
  ) => void;

}

export const useAuthStore = create<AuthState>((set) => ({

  user: null,

  accessToken: null,

  refreshToken: null,

  isAuthenticated: false,

  login: (
    user,
    accessToken,
    refreshToken
  ) =>

    set({

      user,

      accessToken,

      refreshToken,

      isAuthenticated: true,

    }),

  logout: () =>

    set({

      user: null,

      accessToken: null,

      refreshToken: null,

      isAuthenticated: false,

    }),

  updateUser: (updatedUser) =>

    set((state) => ({

      user:
        state.user == null
          ? null
          : {
              ...state.user,
              ...updatedUser,
            },

    })),

}));