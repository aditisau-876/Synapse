export type MessageStatus =
  | "sending"
  | "sent"
  | "delivered"
  | "read";

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  online: boolean;
  lastSeen?: string;
}

export interface Conversation {
  id: string;
  type: "direct" | "group";

  name: string;

  avatar?: string;

  participants: User[];

  lastMessage: string;

  lastMessageTime: string;

  unreadCount: number;

  pinned?: boolean;

  muted?: boolean;

  archived?: boolean;
}

export interface Message {
  id: string;

  conversationId: string;

  sender: User;

  text: string;

  createdAt: string;

  status: MessageStatus;

  own: boolean;

  edited?: boolean;

  replyTo?: string;

  attachments?: string[];
}