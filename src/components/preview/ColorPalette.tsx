import React from 'react';
import { useTokenStore } from '../../stores/tokenStore';
import { ColorSwatch } from './ColorSwatch';

export const ColorPalette: React.FC = () => {
  const { tokens, themeColor, mode } = useTokenStore();

  const colorCategories = [
    { key: 'brand', label: 'Brand', description: 'Primary brand colors' },
    { key: 'neutral', label: 'Neutral', description: 'Neutral grayscale' },
    { key: 'success', label: 'Success', description: 'Success state colors' },
    { key: 'warning', label: 'Warning', description: 'Warning state colors' },
    { key: 'error', label: 'Error', description: 'Error state colors' },
    { key: 'info', label: 'Info', description: 'Info state colors' },
  ];

  return (
    <div className="space-y-6">
      {colorCategories.map((category) => {
        const scale = tokens.global.color[category.key];
        const scaleKeys = Object.keys(scale).sort((a, b) => parseInt(a) - parseInt(b));

        return (
          <div key={category.key} className="space-y-3">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: scale[scaleKeys[4]]?.value }}
              />
              <h3 className={`text-sm font-medium ${
                mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
              }`}>{category.label}</h3>
              <span className={`text-xs ${
                mode === 'light' ? 'text-zinc-500' : 'text-zinc-500'
              }`}>{category.description}</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {scaleKeys.map((key, index) => (
                <ColorSwatch
                  key={key}
                  color={scale[key].value}
                  name={category.label}
                  scale={key}
                  isBaseColor={index === 4}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
