import React from 'react';
import { useTokenStore } from '../../stores/tokenStore';
import { ColorSwatch } from './ColorSwatch';

interface ThemePreviewProps {
  mode: 'light' | 'dark';
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ mode }) => {
  const { tokens } = useTokenStore();
  const themeSet = tokens[mode];

  // Helper function to resolve token references
  const resolveToken = (path: string): string => {
    if (!path.startsWith('{') || !path.endsWith('}')) {
      return path;
    }
    const keyPath = path.slice(1, -1).split('.');
    let value: any = tokens;
    for (const key of keyPath) {
      if (value && value[key]) {
        value = value[key];
      } else {
        return path;
      }
    }
    return value?.value ?? path;
  };

  const themeColors = [
    { category: 'Background', items: themeSet.background },
    { category: 'Foreground', items: themeSet.foreground },
    { category: 'Border', items: themeSet.border },
    { category: 'Accent', items: themeSet.accent },
    { category: 'Status', items: themeSet.status },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-200 capitalize">
          {mode} Theme
        </h3>
        <div 
          className="w-8 h-8 rounded border border-zinc-700"
          style={{ 
            backgroundColor: resolveToken(themeSet.background?.primary?.value || '#ffffff') 
          }}
        />
      </div>

      {themeColors.map(({ category, items }) => {
        if (!items || Object.keys(items).length === 0) return null;
        
        return (
          <div key={category} className="space-y-2">
            <h4 className="text-xs text-zinc-500 uppercase tracking-wide">
              {category}
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(items).map(([name, token]) => {
                const resolvedColor = resolveToken(token.value);
                return (
                  <ColorSwatch
                    key={`${mode}-${category}-${name}`}
                    color={resolvedColor}
                    name={name}
                    scale={category}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
