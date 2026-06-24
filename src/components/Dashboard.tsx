import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useChats } from '@/hooks/useChats';
import { useTheme } from '@/hooks/useTheme';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const chatHook = useChats(user?.id || null);

  const handleNewChat = async () => {
    const chat = await chatHook.createChat();
    if (chat) setSidebarOpen(false);
  };

  const handleSelectChat = async (chatId: string) => {
    const chat = chatHook.chats.find(c => c.id === chatId);
    if (chat) {
      chatHook.setCurrentChat(chat);
      await chatHook.fetchMessages(chatId);
      setSidebarOpen(false);
    }
  };

  const handleSendMessage = async (content: string, imageUrl?: string) => {
    let chatId = chatHook.currentChat?.id;
    if (!chatId) {
      const chat = await chatHook.createChat(content.slice(0, 50));
      if (!chat) return;
      chatId = chat.id;
    }
    await chatHook.addMessage(chatId, 'user', content, imageUrl);
    
    try {
      const { sendMessage } = await import('@/lib/groq');
      const messages = [...chatHook.messages, { role: 'user', content, image_url: imageUrl }].map(m => ({
        role: m.role, content: m.content, image_url: m.image_url
      }));
      const result = await sendMessage(messages);
      await chatHook.addMessage(chatId, 'assistant', result.response);
    } catch (err) {
      await chatHook.addMessage(chatId, 'assistant', 'Sorry, I encountered an error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar chats={chatHook.chats} currentChat={chatHook.currentChat} user={user} theme={theme}
          onNewChat={handleNewChat} onSelectChat={handleSelectChat} onDeleteChat={chatHook.deleteChat}
          onToggleTheme={toggleTheme} onSignOut={async () => { await signOut(); navigate('/'); }} onClose={() => setSidebarOpen(false)} />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="lg:hidden flex items-center p-4 border-b border-white/10">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-white/5"><Menu className="w-6 h-6" /></button>
          <span className="ml-4 font-semibold gradient-text">NOVA AI</span>
        </div>
        <ChatArea messages={chatHook.messages} currentChat={chatHook.currentChat} loading={chatHook.loading}
          onSendMessage={handleSendMessage} onUploadImage={chatHook.uploadImage} />
      </div>
    </div>
  );
          }
