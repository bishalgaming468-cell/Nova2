import { Sparkles, Code, Lightbulb, BookOpen, Rocket } from 'lucide-react';

export default function WelcomeScreen({ onExampleClick }: { onExampleClick: (content: string) => void }) {
  const examples = [
    { icon: Code, title: 'Write code', desc: 'React component', prompt: 'Create a React todo component' },
    { icon: Lightbulb, title: 'Brainstorm', desc: 'Creative ideas', prompt: 'Give me 5 startup ideas' },
    { icon: BookOpen, title: 'Explain', desc: 'Learn concepts', prompt: 'Explain quantum computing' },
    { icon: Rocket, title: 'Analyze', desc: 'Get insights', prompt: 'Tech trends in 2026?' },
  ];

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-12">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-3">Welcome to <span className="gradient-text">NOVA AI</span></h1>
        <p className="text-gray-400 text-lg">How can I help you today?</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
        {examples.map((ex) => (
          <button key={ex.title} onClick={() => onExampleClick(ex.prompt)} className="text-left p-5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center flex-shrink-0">
                <ex.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{ex.title}</h3>
                <p className="text-sm text-gray-400">{ex.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
