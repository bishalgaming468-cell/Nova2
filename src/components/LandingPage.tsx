import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageSquare, Image, Shield, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    { icon: MessageSquare, title: 'Natural Chat', desc: 'Fluid AI conversations' },
    { icon: Image, title: 'Image Analysis', desc: 'Upload & analyze images' },
    { icon: Shield, title: 'Secure', desc: 'Enterprise-grade security' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Powered by Groq' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute top-0 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">NOVA AI</span>
        </div>
        <button onClick={() => navigate(user ? '/chat' : '/auth')} className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition font-medium">
          {user ? 'Open Dashboard' : 'Get Started'}
        </button>
      </nav>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-gray-300">Next Generation AI Assistant</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          <span className="block">The Future of</span>
          <span className="gradient-text">AI Conversation</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Experience cutting-edge AI with image understanding, cloud sync, and a beautiful interface.
        </p>
        <button onClick={() => navigate(user ? '/chat' : '/auth')} className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition font-semibold text-lg shadow-lg shadow-purple-500/25">
          Start Chatting Free
        </button>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Powerful <span className="gradient-text">Features</span></h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-gray-400 text-sm">
        © 2026 NOVA AI. Built with ❤️
      </footer>
    </div>
  );
          }
