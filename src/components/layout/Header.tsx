import React from 'react';
import { Sparkles } from 'lucide-react';
import { ThemeToggle } from '../preview/ThemeToggle';
import { useTokenStore } from '../../stores/tokenStore';

export const Header: React.FC = () => {
  const { mode } = useTokenStore();
  
  return (
    <header 
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
        mode === 'light' 
          ? 'bg-white/80 border-zinc-200' 
          : 'bg-zinc-950/80 border-zinc-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
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

          <div className="flex items-center gap-4">
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
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
