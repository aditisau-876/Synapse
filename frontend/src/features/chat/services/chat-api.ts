import { api } from "@/services/api";

export async function getConversations() { return api.get("/chat/conversations"); }
export async function getMessages(conversationId: string) { return api.get(`/chat/${conversationId}/messages`); }
export async function sendEncryptedMessage(payload: { conversation_id: string; recipient_id?: string; ciphertext: string; nonce: string; sender_public_key: string }) { return api.post("/security/encrypted-messages", payload); }
export async function getEncryptedMessages(conversationId: string) { return api.get(`/security/encrypted-messages/${conversationId}`); }
export async function publishPublicKey(payload: { algorithm: "ECDH-P256"; public_key: string; fingerprint: string }) { return api.post("/security/public-key", payload); }
export async function getPublicKey(userId: string) { return api.get(`/security/public-key/${userId}`); }
