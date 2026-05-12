import React from 'react';
import { Sparkles, Download } from 'lucide-react';
import { ThemeToggle } from '../preview/ThemeToggle';
import { useTokenStore } from '../../stores/tokenStore';

export const Header: React.FC = () => {
  const { mode, themeColor } = useTokenStore();
  
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
  
  const getContrastColor = (hex: string): string => {
    if (hex.length === 4) {
      hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance > 0.5 ? '#18181b' : '#ffffff';
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
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: themeColor }}>
              <Sparkles className="w-5 h-5" style={{ color: getContrastColor(themeColor) }} />
            </div>
            <div className="absolute -inset-1 rounded-xl blur opacity-30 -z-10" style={{ backgroundColor: themeColor }} />
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
          <ThemeToggle />
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: themeColor, color: getContrastColor(themeColor) }}
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};
