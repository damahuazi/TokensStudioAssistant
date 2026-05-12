import React, { useState, useEffect } from 'react';
import { useTokenStore } from '../../stores/tokenStore';

export const ColorPicker: React.FC = () => {
  const { themeColor, setThemeColor, mode } = useTokenStore();
  const [inputValue, setInputValue] = useState(themeColor);

  useEffect(() => {
    setInputValue(themeColor);
  }, [themeColor]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setInputValue(newColor);
    setThemeColor(newColor);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith('#')) {
      value = '#' + value;
    }
    setInputValue(value);
    
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setThemeColor(value);
    }
  };

  const presetColors = [
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#f97316',
    '#eab308',
    '#22c55e',
    '#14b8a6',
    '#6366f1',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className={`text-sm font-medium ${
          mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
        }`}>
          Theme Color
        </label>
        <span className={`text-xs font-mono ${
          mode === 'light' ? 'text-zinc-600' : 'text-zinc-500'
        }`}>{inputValue.toUpperCase()}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={themeColor}
            onChange={handleColorChange}
            className={`w-12 h-12 rounded-lg cursor-pointer border-2 bg-transparent ${
              mode === 'light' ? 'border-zinc-300' : 'border-zinc-700'
            }`}
            style={{ padding: 0 }}
          />
        </div>

        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="#3b82f6"
          className={`flex-1 px-3 py-2 border rounded-lg text-sm font-mono transition-all focus:outline-none focus:ring-1 ${
            mode === 'light'
              ? 'bg-white border-zinc-300 text-zinc-900 focus:border-blue-500 focus:ring-blue-500/50'
              : 'bg-zinc-800 border-zinc-700 text-zinc-200 focus:border-blue-500 focus:ring-blue-500/50'
          }`}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => {
              setInputValue(color);
              setThemeColor(color);
            }}
            className={`w-8 h-8 rounded-md border-2 transition-all duration-200 ${
              themeColor === color
                ? 'border-white scale-110 shadow-lg'
                : mode === 'light'
                ? 'border-transparent hover:border-zinc-400'
                : 'border-transparent hover:border-zinc-600'
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>

      <div className="h-2 rounded-full overflow-hidden" style={{
        background: `linear-gradient(to right, 
          hsl(0, 70%, 50%), 
          hsl(60, 70%, 50%), 
          hsl(120, 70%, 50%), 
          hsl(180, 70%, 50%), 
          hsl(240, 70%, 50%), 
          hsl(300, 70%, 50%), 
          hsl(360, 70%, 50%))`
      }} />
    </div>
  );
};
