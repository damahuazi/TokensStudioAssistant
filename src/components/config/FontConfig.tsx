import React from 'react';
import { useTokenStore } from '../../stores/tokenStore';

export const FontConfig: React.FC = () => {
  const { fontConfig, setFontConfig } = useTokenStore();

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
        <label className="block text-sm font-medium text-zinc-200 mb-2">
          Primary Font
        </label>
        <select
          value={fontConfig.primaryFont}
          onChange={(e) => setFontConfig({ primaryFont: e.target.value })}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-200
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
        >
          {fontOptions.map((font) => (
            <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
              {font.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-200 mb-2">
          Monospace Font
        </label>
        <select
          value={fontConfig.monoFont}
          onChange={(e) => setFontConfig({ monoFont: e.target.value })}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-200
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
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
          <label className="text-sm font-medium text-zinc-200">
            Base Font Size
          </label>
          <span className="text-xs text-zinc-500 font-mono">{fontConfig.baseFontSize}px</span>
        </div>
        <input
          type="range"
          min="12"
          max="20"
          step="1"
          value={fontConfig.baseFontSize}
          onChange={(e) => setFontConfig({ baseFontSize: parseInt(e.target.value) })}
          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-blue-500
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:shadow-lg"
        />
        <div className="flex justify-between mt-1 text-xs text-zinc-500">
          <span>12px</span>
          <span>16px</span>
          <span>20px</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-zinc-200">
            Scale Ratio
          </label>
          <span className="text-xs text-zinc-500 font-mono">{fontConfig.scaleRatio.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="1.125"
          max="1.5"
          step="0.025"
          value={fontConfig.scaleRatio}
          onChange={(e) => setFontConfig({ scaleRatio: parseFloat(e.target.value) })}
          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-blue-500
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:shadow-lg"
        />
        <div className="flex justify-between mt-1 text-xs text-zinc-500">
          <span>Minor Second (1.067)</span>
          <span>Major Third (1.25)</span>
          <span>Perfect Fifth (1.5)</span>
        </div>
      </div>
    </div>
  );
};
