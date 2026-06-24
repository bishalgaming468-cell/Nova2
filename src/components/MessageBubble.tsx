import { User, Sparkles, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Message } from '@/types';

export default function MessageBubble({ message }: { message: Message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${isUser ? 'bg-gradient-to-br from-cyan-400 to-blue-600' : 'bg-gradient-to-br from-purple-500 to-pink-600'}`}>
        {isUser ? <User className="w-5 h-5 text-white" /> : <Sparkles className="w-5 h-5 text-white" />}
      </div>
      <div className={`flex-1 max-w-[80%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block rounded-2xl px-5 py-3 ${isUser ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30' : 'bg-white/5 border border-white/10'}`}>
          {message.image_url && (
            <div className="mb-3 rounded-lg overflow-hidden">
              <img src={message.image_url} alt="Uploaded" className="max-w-full max-h-64 object-cover" />
            </div>
          )}
          <div className="markdown-content text-gray-200">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        </div>
        {!isUser && (
          <button onClick={handleCopy} className="mt-2 ml-2 p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-gray-300">
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
