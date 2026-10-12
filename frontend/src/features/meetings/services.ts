import { api } from "@/services/api";
import type { Meeting } from "./types/meeting";
export interface RemoteMeeting extends Meeting { code: string; /** ISO start time (UTC). */ start_at?: string; }
export async function getMeetings() { const { data } = await api.get<RemoteMeeting[]>("/meetings"); return data; }
export async function createMeeting(title: string, start_at: string, end_at?: string) { const { data } = await api.post<RemoteMeeting>("/meetings", { title, start_at, end_at }); return data; }
export async function instantMeeting() { const { data } = await api.post<RemoteMeeting>("/meetings/instant"); return data; }
export async function getMeetingByCode(code: string) { const { data } = await api.get<RemoteMeeting>(`/meetings/join/${encodeURIComponent(code)}`); return data; }
