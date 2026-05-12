import React from 'react';
import { useTokenStore } from '../../stores/tokenStore';

export const ScaleSlider: React.FC = () => {
  const { scaleCount, setScaleCount } = useTokenStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-200">
          Scale Count
        </label>
        <span className="text-xs text-zinc-500 font-mono">{scaleCount} steps</span>
      </div>

      <div className="relative">
        <input
          type="range"
          min="5"
          max="10"
          step="1"
          value={scaleCount}
          onChange={(e) => setScaleCount(parseInt(e.target.value))}
          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-blue-500
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110"
        />
        
        <div className="flex justify-between mt-2 text-xs text-zinc-500">
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
      </div>

      <div className="flex gap-1">
        {[5, 6, 7, 8, 9, 10].map((count) => (
          <button
            key={count}
            onClick={() => setScaleCount(count)}
            className={`flex-1 py-1 text-xs rounded transition-all ${
              scaleCount === count
                ? 'bg-blue-500 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
};
