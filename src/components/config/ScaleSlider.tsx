import React from 'react';
import { useTokenStore } from '../../stores/tokenStore';

export const ScaleSlider: React.FC = () => {
  const { scaleCount, mode } = useTokenStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className={`text-sm font-medium ${
          mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
        }`}>
          Scale Count
        </label>
        <span className={`text-xs font-mono px-2 py-1 rounded ${
          mode === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/50 text-blue-400'
        }`}>{scaleCount} steps</span>
      </div>

      <div className="flex gap-1">
        {[5, 6, 7, 8, 9, 10].map((count) => (
          <button
            key={count}
            disabled={count !== 10}
            className={`flex-1 h-8 text-xs font-medium rounded transition-all ${
              count === 10
                ? 'bg-blue-500 text-white'
                : mode === 'light'
                ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
            }`}
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
};