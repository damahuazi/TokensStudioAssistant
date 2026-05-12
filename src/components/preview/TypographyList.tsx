import React from 'react';
import { useTokenStore } from '../../stores/tokenStore';

export const TypographyList: React.FC = () => {
  const { tokens, fontConfig } = useTokenStore();

  const fontSizes = tokens.global.typography.fontSize;
  const fontWeights = tokens.global.typography.fontWeight;
  const lineHeights = tokens.global.typography.lineHeight;

  const fontSizeEntries = [
    { key: 'xs', label: 'Extra Small' },
    { key: 'sm', label: 'Small' },
    { key: 'base', label: 'Base' },
    { key: 'lg', label: 'Large' },
    { key: 'xl', label: 'Extra Large' },
    { key: '2xl', label: '2XL' },
    { key: '3xl', label: '3XL' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-zinc-200">Font Sizes</h3>
        <div className="space-y-3">
          {fontSizeEntries.map(({ key, label }) => {
            const token = fontSizes[key];
            if (!token) return null;
            const size = parseInt(token.value);
            return (
              <div
                key={key}
                className="flex items-baseline justify-between py-2 border-b border-zinc-800 last:border-0"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-xs font-mono text-zinc-500 w-12 shrink-0">
                    {key}
                  </span>
                  <span className="text-xs text-zinc-400 w-20 shrink-0 truncate">
                    {label}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className="text-zinc-200 truncate max-w-[200px]"
                    style={{
                      fontSize: `${Math.min(size, 32)}px`,
                      fontFamily: fontConfig.primaryFont,
                    }}
                  >
                    Aa Bb Cc
                  </span>
                  <span className="text-xs font-mono text-zinc-500 w-16 text-right shrink-0">
                    {token.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-zinc-200">Font Weights</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(fontWeights).map(([key, token]) => (
            <div
              key={key}
              className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-800"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-500">{key}</span>
                <span className="text-xs font-mono text-zinc-400">{token.value}</span>
              </div>
              <p
                className="text-zinc-200"
                style={{
                  fontWeight: token.value,
                  fontFamily: fontConfig.primaryFont,
                }}
              >
                The quick brown fox
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-zinc-200">Line Heights</h3>
        <div className="space-y-3">
          {Object.entries(lineHeights).map(([key, token]) => (
            <div
              key={key}
              className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-800"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-500">{key}</span>
                <span className="text-xs font-mono text-zinc-400">{token.value}</span>
              </div>
              <p
                className="text-sm text-zinc-300"
                style={{
                  lineHeight: token.value,
                  fontFamily: fontConfig.primaryFont,
                }}
              >
                The quick brown fox jumps over the lazy dog. Typography is the art and technique
                of arranging type to make written language legible, readable, and appealing.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
