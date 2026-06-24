import { Plus, MessageSquare, Settings, LogOut, Sun, Trash2, Sparkles, X } from 'lucide-react';
import type { Chat, User, Theme } from '@/types';

interface Props {
  chats: Chat[]; currentChat: Chat | null; user: User | null; theme: Theme;
  onNewChat: () => void; onSelectChat: (id: string) => void; onDeleteChat: (id: string) => void;
  onToggleTheme: () => void; onSignOut: () => void; onClose: () => void;
}

export default function Sidebar({ chats, currentChat, user, theme, onNewChat, onSelectChat, onDeleteChat, onToggleTheme, onSignOut, onClose }: Props) {
  return (
    <div className="w-80 h-screen flex flex-col bg-slate-900 border-r border-white/10">
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-lg font-bold gradient-text">NOVA AI</span>
        </div>
        <button onClick={onClose} className="lg:hidden p-2 rounded-lg hover:bg-white/5"><X className="w-5 h-5" /></button>
      </div>

      <div className="p-4">
        <button onClick={onNewChat} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 hover:from-cyan-500/30 hover:to-purple-600/30 transition">
          <Plus className="w-5 h-5 text-cyan-400" />
          <span className="font-medium">New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Recent Chats</div>
        <div className="space-y-1">
          {chats.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No chats yet</p>
            </div>
          ) : chats.map((chat) => (
            <div key={chat.id} className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition ${currentChat?.id === chat.id ? 'bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-500/30' : 'hover:bg-white/5'}`}
              onClick={() => onSelectChat(chat.id)}>
              <MessageSquare className={`w-4 h-4 flex-shrink-0 ${currentChat?.id === chat.id ? 'text-cyan-400' : 'text-gray-500'}`} />
              <span className="flex-1 text-sm truncate">{chat.title}</span>
              <button onClick={(e) => { e.stopPropagation(); onDeleteChat(chat.id); }} className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20">
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-white/10 space-y-2">
        <button onClick={onToggleTheme} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-gray-300">
          <Sun className="w-5 h-5" />
          <span className="text-sm">Toggle Theme</span>
        </button>
        <button onClick={() => window.location.href = '/settings'} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-gray-300">
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </button>
        {user && (
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
              {user.email[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{user.email}</p></div>
            <button onClick={onSignOut} className="p-1.5 rounded-lg hover:bg-red-500/20"><LogOut className="w-4 h-4 text-red-400" /></button>
          </div>
        )}
      </div>
    </div>
  );
              }
