import { useState, useRef } from 'react';
import { Send, ImagePlus, X, Loader2 } from 'lucide-react';

interface Props {
  onSend: (content: string, imageUrl?: string) => void;
  onUploadImage: (file: File) => Promise<string | null>;
  disabled: boolean;
}

export default function InputArea({ onSend, onUploadImage, disabled }: Props) {
  const [input, setInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setUploading(true);
    try {
      const url = await onUploadImage(file);
      if (url) setImagePreview(url);
    } finally { setUploading(false); }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !imagePreview) || disabled) return;
    onSend(input.trim(), imagePreview || undefined);
    setInput('');
    setImagePreview(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {imagePreview && (
        <div className="mb-3 relative inline-block">
          <div className="relative rounded-xl overflow-hidden border border-white/10">
            <img src={imagePreview} alt="Preview" className="max-h-32 object-cover" />
            {uploading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-white" /></div>}
            <button onClick={() => setImagePreview(null)} className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 hover:bg-black/70">
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/5">
        <div className="flex items-end gap-2 p-3">
          <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageSelect(e.target.files[0])} className="hidden" />
          <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="p-2.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-cyan-400 disabled:opacity-50">
            <ImagePlus className="w-5 h-5" />
          </button>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }}
            placeholder="Message NOVA AI..." rows={1} className="flex-1 bg-transparent resize-none outline-none text-white placeholder-gray-500 py-2.5" />
          <button type="submit" disabled={disabled || (!input.trim() && !imagePreview)} className="p-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 disabled:opacity-50">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </form>
      <p className="text-xs text-center text-gray-500 mt-2">NOVA AI can make mistakes. Verify important information.</p>
    </div>
  );
}
