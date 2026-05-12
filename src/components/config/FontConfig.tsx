import React from 'react';
import { useTokenStore } from '../../stores/tokenStore';

export const FontConfig: React.FC = () => {
  const { fontConfig, setFontConfig, mode, themeColor } = useTokenStore();

  const fontOptions = [
    { label: 'Inter', value: 'Inter, system-ui, sans-serif' },
    { label: 'IBM Plex Sans', value: '"IBM Plex Sans", system-ui, sans-serif' },
    { label: 'DM Sans', value: '"DM Sans", system-ui, sans-serif' },
    { label: 'Plus Jakarta Sans', value: '"Plus Jakarta Sans", system-ui, sans-serif' },
    { label: 'Outfit', value: 'Outfit, system-ui, sans-serif' },
  ];

  const monoOptions = [
    { label: 'JetBrains Mono', value: '"JetBrains Mono", monospace' },
    { label: 'Fira Code', value: '"Fira Code", monospace' },
    { label: 'Source Code Pro', value: '"Source Code Pro", monospace' },
    { label: 'IBM Plex Mono', value: '"IBM Plex Mono", monospace' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className={`block text-sm font-medium mb-2 ${
          mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
        }`}>
          Primary Font
        </label>
        <select
          value={fontConfig.primaryFont}
          onChange={(e) => setFontConfig({ primaryFont: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-all focus:outline-none focus:ring-1 ${
            mode === 'light'
              ? 'bg-white border-zinc-300 text-zinc-900'
              : 'bg-zinc-800 border-zinc-700 text-zinc-200'
          }`}
          style={{
            outlineColor: themeColor,
            boxShadow: 'none',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = themeColor;
            e.target.style.boxShadow = `0 0 0 1px ${themeColor}50`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '';
            e.target.style.boxShadow = 'none';
          }}
        >
          {fontOptions.map((font) => (
            <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
              {font.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${
          mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
        }`}>
          Monospace Font
        </label>
        <select
          value={fontConfig.monoFont}
          onChange={(e) => setFontConfig({ monoFont: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-all focus:outline-none focus:ring-1 ${
            mode === 'light'
              ? 'bg-white border-zinc-300 text-zinc-900'
              : 'bg-zinc-800 border-zinc-700 text-zinc-200'
          }`}
          style={{
            outlineColor: themeColor,
            boxShadow: 'none',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = themeColor;
            e.target.style.boxShadow = `0 0 0 1px ${themeColor}50`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '';
            e.target.style.boxShadow = 'none';
          }}
        >
          {monoOptions.map((font) => (
            <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
              {font.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={`text-sm font-medium ${
            mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
          }`}>
            Base Font Size
          </label>
          <span className={`text-xs font-mono ${
            mode === 'light' ? 'text-zinc-600' : 'text-zinc-500'
          }`}>{fontConfig.baseFontSize}px</span>
        </div>
        <input
          type="range"
          min="12"
          max="20"
          step="1"
          value={fontConfig.baseFontSize}
          onChange={(e) => setFontConfig({ baseFontSize: parseInt(e.target.value) })}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:hover:scale-110 ${
            mode === 'light' ? 'bg-zinc-200' : 'bg-zinc-800'
          }`}
          style={{
            '--thumb-bg': themeColor,
          } as React.CSSProperties}
        />
        <style dangerouslySetInnerHTML={{ __html: `
          input[type="range"]::-webkit-slider-thumb {
            background-color: ${themeColor} !important;
          }
          input[type="range"]::-moz-range-thumb {
            background-color: ${themeColor} !important;
          }
        `}} />
        <div className={`flex justify-between mt-1 text-xs ${
          mode === 'light' ? 'text-zinc-600' : 'text-zinc-500'
        }`}>
          <span>12px</span>
          <span>16px</span>
          <span>20px</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={`text-sm font-medium ${
            mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
          }`}>
            Scale Ratio
          </label>
          <span className={`text-xs font-mono ${
            mode === 'light' ? 'text-zinc-600' : 'text-zinc-500'
          }`}>{fontConfig.scaleRatio.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="1.125"
          max="1.5"
          step="0.025"
          value={fontConfig.scaleRatio}
          onChange={(e) => setFontConfig({ scaleRatio: parseFloat(e.target.value) })}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:hover:scale-110 ${
            mode === 'light' ? 'bg-zinc-200' : 'bg-zinc-800'
          }`}
          style={{
            '--thumb-bg': themeColor,
          } as React.CSSProperties}
        />
        <div className={`flex justify-between mt-1 text-xs ${
          mode === 'light' ? 'text-zinc-600' : 'text-zinc-500'
        }`}>
          <span>Minor Second (1.067)</span>
          <span>Major Third (1.25)</span>
          <span>Perfect Fifth (1.5)</span>
        </div>
      </div>
    </div>
  );
};
