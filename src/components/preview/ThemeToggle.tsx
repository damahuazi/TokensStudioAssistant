import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTokenStore } from '../../stores/tokenStore';

export const ThemeToggle: React.FC = () => {
  const { mode, toggleMode } = useTokenStore();

  return (
    <button
      onClick={toggleMode}
      className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-200 ${
        mode === 'light'
          ? 'bg-zinc-100 border-zinc-200 hover:border-zinc-300'
          : 'bg-zinc-800 border-zinc-700 hover:border-zinc-600'
      }`}
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
    </button>
  );
};
