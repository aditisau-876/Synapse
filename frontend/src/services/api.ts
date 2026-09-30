import axios from "axios";
import { useAuthStore } from "@/features/auth/store/auth-store";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;


let refreshing: Promise<string | null> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as
      | (typeof error.config & { _synapseRetry?: boolean })
      | undefined;
    const status = error.response?.status;

    if (status !== 401 || !original || original._synapseRetry) {
      return Promise.reject(error);
    }

    const refreshToken = useAuthStore.getState().refreshToken;
    if (!refreshToken) return Promise.reject(error);

    original._synapseRetry = true;

    try {
      refreshing ??= axios
        .post<{ access_token: string; refresh_token: string }>(
          `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/auth/refresh`,
          { refresh_token: refreshToken },
        )
        .then(({ data }) => {
          useAuthStore.setState({
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          });
          return data.access_token;
        })
        .catch(() => {
          useAuthStore.getState().logout();
          return null;
        })
        .finally(() => {
          refreshing = null;
        });

      const token = await refreshing;
      if (!token) return Promise.reject(error);

      original.headers.Authorization = `Bearer ${token}`;
      return api(original);
    } catch {
      useAuthStore.getState().logout();
      return Promise.reject(error);
    }
  },
);
