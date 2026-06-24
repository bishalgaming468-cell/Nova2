import { Sparkles } from 'lucide-react';

export default function LoadingAnimation() {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}
