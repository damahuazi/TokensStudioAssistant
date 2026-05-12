import React from 'react';
import { Sparkles, Download } from 'lucide-react';
import { ThemeToggle } from '../preview/ThemeToggle';
import { useTokenStore } from '../../stores/tokenStore';

export const Header: React.FC = () => {
  const { mode } = useTokenStore();
  
  const handleExport = () => {
    const tokens = useTokenStore.getState().tokens;
    const blob = new Blob([JSON.stringify(tokens, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tokens.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <header 
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
        mode === 'light' 
          ? 'bg-white/80 border-zinc-200' 
          : 'bg-zinc-950/80 border-zinc-800'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur opacity-30 -z-10" />
          </div>
          <div>
            <h1 className={`text-xl font-bold tracking-tight ${
              mode === 'light' ? 'text-zinc-900' : 'text-zinc-100'
            }`}>
              Tokens Studio Assistant
            </h1>
            <p className="text-xs text-zinc-500">
              Design System Token Generator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://docs.tokens.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs hover:transition-colors ${
              mode === 'light' 
                ? 'text-zinc-600 hover:text-zinc-900' 
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Tokens Studio Docs
          </a>
          <button
            onClick={handleExport}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
              mode === 'light'
                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
            }`}
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
