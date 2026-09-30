import { api } from "@/services/api";
export async function askAI(prompt: string, kind = "chat") { const { data } = await api.post<{ id: string; content: string; created_at: string; expires_at: string }>("/ai/chat", { prompt, kind }); return data; }
export async function getAIHistory() { const { data } = await api.get<Array<{id:string;title:string;kind:string;prompt:string;response:string;created_at:string;expires_at:string}>>("/ai/history"); return data; }
