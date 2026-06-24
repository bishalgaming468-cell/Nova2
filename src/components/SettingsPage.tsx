import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Database, Shield, CheckCircle, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useChats } from '@/hooks/useChats';
import { checkHealth } from '@/lib/groq';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { chats, deleteChat } = useChats(user?.id || null);
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  useEffect(() => { checkHealth().then(h => setApiStatus(h ? 'online' : 'offline')); }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={() => navigate('/chat')} className="p-2 rounded-lg hover:bg-white/5"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-2xl font-bold gradient-text">Settings</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><User className="w-5 h-5 text-cyan-400" />Profile</h2>
          <div className="space-y-3">
            <div><label className="text-sm text-gray-400">Email</label><p className="font-medium">{user?.email}</p></div>
            <div><label className="text-sm text-gray-400">Member Since</label><p className="font-medium">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p></div>
          </div>
        </div>
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-cyan-400" />API Status</h2>
          <div className="flex items-center gap-3">
            {apiStatus === 'online' ? <CheckCircle className="w-5 h-5 text-green-400" /> : <div className="w-5 h-5 rounded-full bg-red-400" />}
            <span className={apiStatus === 'online' ? 'text-green-400' : 'text-red-400'}>{apiStatus === 'online' ? 'Groq API Connected' : 'API Unavailable'}</span>
          </div>
        </div>
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Database className="w-5 h-5 text-cyan-400" />Data</h2>
          <p className="text-sm text-gray-400 mb-4">Total Chats: {chats.length}</p>
          <button onClick={async () => { if (confirm('Delete all chats?')) for (const c of chats) await deleteChat(c.id); }}
            className="w-full py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 flex items-center justify-center gap-2">
            <Trash2 className="w-4 h-4" />Delete All Chats
          </button>
        </div>
        <button onClick={async () => { await signOut(); navigate('/'); }} className="w-full py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20">
          Sign Out
        </button>
      </div>
    </div>
  );
}
