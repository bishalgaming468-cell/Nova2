import { useState, useRef, useEffect } from 'react';
import type { Message, Chat } from '@/types';
import MessageBubble from './MessageBubble';
import InputArea from './InputArea';
import WelcomeScreen from './WelcomeScreen';
import LoadingAnimation from './LoadingAnimation';

interface Props {
  messages: Message[]; currentChat: Chat | null; loading: boolean;
  onSendMessage: (content: string, imageUrl?: string) => void;
  onUploadImage: (file: File) => Promise<string | null>;
}

export default function ChatArea({ messages, currentChat, loading, onSendMessage, onUploadImage }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isGenerating]);

  const handleSend = async (content: string, imageUrl?: string) => {
    if (!content.trim() && !imageUrl) return;
    setIsGenerating(true);
    try { await onSendMessage(content, imageUrl); } finally { setIsGenerating(false); }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 && !currentChat ? (
          <WelcomeScreen onExampleClick={handleSend} />
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
            {messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)}
            {isGenerating && <LoadingAnimation />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <div className="border-t border-white/10 p-4">
        <InputArea onSend={handleSend} onUploadImage={onUploadImage} disabled={isGenerating} />
      </div>
    </div>
  );
}
