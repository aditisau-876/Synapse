export type AIMessageRole = "user" | "assistant";

export interface AIMessage {
  id: string;
  role: AIMessageRole;
  content: string;
  timestamp: Date;
}

export interface AIConversation {
  id: string;
  title: string;
  messages: AIMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AISuggestion {
  id: string;
  title: string;
  description: string;
  prompt: string;
  icon?: string;
}

export interface AIWorkspaceState {
  messages: AIMessage[];
  isLoading: boolean;
  input: string;
}