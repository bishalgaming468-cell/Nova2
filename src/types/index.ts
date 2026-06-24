export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Chat {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
}

export interface Message {
  id: string;
  chat_id: string;
  role: 'user' | 'assistant';
  content: string;
  image_url?: string | null;
  created_at: string;
}

export type Theme = 'dark' | 'light';
