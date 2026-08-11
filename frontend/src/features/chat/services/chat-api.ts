import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function getConversations() {
  return api.get("/chat/conversations");
}

export async function getMessages(
  conversationId: string
) {
  return api.get(
    `/chat/${conversationId}/messages`
  );
}

export async function sendMessage(
  conversationId: string,
  text: string
) {
  return api.post(
    `/chat/${conversationId}`,
    {
      text,
    }
  );
}