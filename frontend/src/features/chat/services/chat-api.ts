import { api } from "@/services/api";

export interface ApiMember {
  id: string;
  name: string;
  avatar?: string | null;
  online?: boolean;
  last_seen?: string | null;
}

export interface ApiConversation {
  id: string;
  type?: "direct" | "group";
  members?: ApiMember[];
  created_at?: string;
}

export interface ApiEncryptedMessage {
  id: string;
  sender_id: string;
  recipient_id?: string | null;
  ciphertext: string;
  nonce: string;
  sender_public_key: string;
  created_at: string;
}

export async function getConversations() { return api.get<ApiConversation[]>("/chat/conversations"); }
export async function createConversation(participantIds: string[]) {
  return api.post<{ id: string; type: "direct" | "group"; member_ids: string[] }>("/chat/conversations", { participant_ids: participantIds });
}
export async function searchUsers(q: string) {
  return api.get<ApiMember[]>("/users/search", { params: { q } });
}
export async function sendEncryptedMessage(payload: { conversation_id: string; recipient_id?: string; ciphertext: string; nonce: string; sender_public_key: string }) { return api.post<{ id: string; created_at: string }>("/security/encrypted-messages", payload); }
export async function getEncryptedMessages(conversationId: string) { return api.get<ApiEncryptedMessage[]>(`/security/encrypted-messages/${conversationId}`); }
export async function publishPublicKey(payload: { algorithm: "ECDH-P256"; public_key: string; fingerprint: string }) { return api.post("/security/public-key", payload); }
export async function getPublicKey(userId: string) { return api.get<{ user_id: string; public_key: string; fingerprint: string }>(`/security/public-key/${userId}`); }
