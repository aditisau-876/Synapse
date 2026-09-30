import { api } from "@/services/api";
import type { User } from "../store/auth-store";

export interface AuthResponse {
  user?: User;
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  requires_verification?: boolean;
  challenge_id?: string;
  dev_code?: string;
  session_id?: string;
  verification?: {
    challenge_id: string;
    channel: string;
    expires_in_minutes: number;
    dev_code?: string;
  };
}

export interface SignupPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export async function signup(payload: SignupPayload) {
  const { data } = await api.post<AuthResponse>("/auth/signup", payload);
  return data;
}

export async function login(identifier: string, password: string) {
  const { data } = await api.post<AuthResponse>("/auth/login", {
    identifier,
    password,
  });
  return data;
}

export async function verifyEmail(challenge_id: string, code: string) {
  const { data } = await api.post<AuthResponse>("/auth/verify-email", {
    challenge_id,
    code,
  });
  return data;
}

export async function refreshAccessToken(refresh_token: string) {
  const { data } = await api.post<{ access_token: string; refresh_token: string }>(
    "/auth/refresh",
    { refresh_token },
  );
  return data;
}

export async function logout() {
  await api.post("/auth/logout");
}

export async function getCurrentUser() {
  const { data } = await api.get<User>("/auth/me");
  return data;
}


export async function requestPhoneOtp() {
  const { data } = await api.post<{ challenge_id: string; channel: string; expires_in_minutes: number; dev_code?: string }>("/auth/request-phone-otp");
  return data;
}

export async function verifyPhone(challenge_id: string, code: string) {
  const { data } = await api.post<AuthResponse>("/auth/verify-phone", { challenge_id, code });
  return data;
}

export async function forgotPassword(identifier: string) {
  const { data } = await api.post<{ ok: boolean; challenge_id?: string; dev_code?: string }>("/auth/forgot-password", null, { params: { identifier } });
  return data;
}

export async function resetPassword(challenge_id: string, code: string, new_password: string) {
  const { data } = await api.post<{ ok: boolean }>("/auth/reset-password", { challenge_id, code, new_password });
  return data;
}

export async function revokeSession(sessionId: string) {
  return api.delete(`/security/sessions/${sessionId}`);
}

export async function revokeAllSessions() {
  const { data } = await api.post<{ ok: boolean; count: number }>("/security/sessions/revoke-all");
  return data;
}

export async function getSessions() {
  const { data } = await api.get<Array<{ id: string; device_name: string; last_active: string; created_at: string }>>("/security/sessions");
  return data;
}

export async function changePassword(current_password: string, new_password: string) {
  const { data } = await api.post<{ ok: boolean }>("/security/password", { current_password, new_password });
  return data;
}
