import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTokenStore } from '../../stores/tokenStore';

export const ThemeToggle: React.FC = () => {
  const { mode, toggleMode } = useTokenStore();

  return (
    <button
      onClick={toggleMode}
      className="relative flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full border border-zinc-700
        hover:border-zinc-600 transition-all duration-200 group"
      aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative flex items-center">
        <Sun
          className={`w-4 h-4 transition-all duration-200 ${
            mode === 'light'
              ? 'text-yellow-500 rotate-0 scale-100'
              : 'text-zinc-500 rotate-90 scale-0 absolute'
          }`}
        />
        <Moon
          className={`w-4 h-4 transition-all duration-200 ${
            mode === 'dark'
              ? 'text-blue-400 rotate-0 scale-100'
              : 'text-zinc-500 -rotate-90 scale-0 absolute'
          }`}
        />
      </div>
      <span className="text-xs font-medium text-zinc-300">
        {mode === 'light' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
};
