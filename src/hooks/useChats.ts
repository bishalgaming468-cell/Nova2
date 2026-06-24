import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Chat, Message } from '@/types';

export function useChats(userId: string | null) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchChats = useCallback(async () => {
    if (!userId) return;
    const { data } = await supabase.from('chats').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    setChats(data || []);
  }, [userId]);

  const createChat = useCallback(async (title: string = 'New Chat') => {
    if (!userId) return null;
    const { data, error } = await supabase.from('chats').insert({ user_id: userId, title }).select().single();
    if (error) return null;
    setChats(prev => [data, ...prev]);
    setCurrentChat(data);
    setMessages([]);
    return data;
  }, [userId]);

  const deleteChat = useCallback(async (chatId: string) => {
    await supabase.from('chats').delete().eq('id', chatId);
    setChats(prev => prev.filter(c => c.id !== chatId));
    if (currentChat?.id === chatId) {
      setCurrentChat(null);
      setMessages([]);
    }
  }, [currentChat]);

  const fetchMessages = useCallback(async (chatId: string) => {
    setLoading(true);
    const { data } = await supabase.from('messages').select('*').eq('chat_id', chatId).order('created_at', { ascending: true });
    setMessages(data || []);
    setLoading(false);
  }, []);

  const addMessage = useCallback(async (chatId: string, role: 'user' | 'assistant', content: string, imageUrl?: string) => {
    const { data, error } = await supabase.from('messages').insert({ chat_id: chatId, role, content, image_url: imageUrl }).select().single();
    if (!error) setMessages(prev => [...prev, data]);
    return data;
  }, []);

  const uploadImage = useCallback(async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage.from('chat-images').upload(fileName, file);
    if (error) return null;
    const { data } = supabase.storage.from('chat-images').getPublicUrl(fileName);
    return data.publicUrl;
  }, []);

  useEffect(() => { if (userId) fetchChats(); }, [userId, fetchChats]);

  return { chats, currentChat, messages, loading, setCurrentChat, createChat, deleteChat, fetchMessages, addMessage, uploadImage };
  }
