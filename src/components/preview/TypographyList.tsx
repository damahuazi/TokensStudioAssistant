import React from 'react';
import { useTokenStore } from '../../stores/tokenStore';

export const TypographyList: React.FC = () => {
  const { tokens, fontConfig, mode } = useTokenStore();

  const fontSizes = tokens.global.fontSize;
  const fontWeights = tokens.global.fontWeight;
  const lineHeights = tokens.global.lineHeight;

  const fontSizeEntries = [
    { key: '12', label: '12px' },
    { key: '14', label: '14px' },
    { key: '16', label: '16px' },
    { key: '18', label: '18px' },
    { key: '20', label: '20px' },
    { key: '24', label: '24px' },
    { key: '28', label: '28px' },
    { key: '32', label: '32px' },
    { key: '40', label: '40px' },
    { key: '48', label: '48px' },
    { key: '64', label: '64px' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className={`text-sm font-medium ${
          mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
        }`}>Font Sizes</h3>
        <div className="space-y-3">
          {fontSizeEntries.map(({ key, label }) => {
            const token = fontSizes[key];
            if (!token) return null;
            const size = parseInt(token.value);
            return (
              <div
                key={key}
                className={`flex items-baseline justify-between py-2 border-b last:border-0 ${
                  mode === 'light' ? 'border-zinc-200' : 'border-zinc-800'
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className={`text-xs font-mono w-12 shrink-0 ${
                    mode === 'light' ? 'text-zinc-600' : 'text-zinc-500'
                  }`}>
                    {key}
                  </span>
                  <span className={`text-xs w-20 shrink-0 truncate ${
                    mode === 'light' ? 'text-zinc-500' : 'text-zinc-400'
                  }`}>
                    {label}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`truncate max-w-[200px] ${
                      mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
                    }`}
                    style={{
                      fontSize: `${Math.min(size, 32)}px`,
                      fontFamily: fontConfig.primaryFont,
                    }}
                  >
                    Aa Bb Cc
                  </span>
                  <span className={`text-xs font-mono w-16 text-right shrink-0 ${
                    mode === 'light' ? 'text-zinc-600' : 'text-zinc-500'
                  }`}>
                    {token.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className={`text-sm font-medium ${
          mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
        }`}>Font Weights</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(fontWeights).map(([key, token]) => (
            <div
              key={key}
              className={`p-3 rounded-lg border ${
                mode === 'light'
                  ? 'bg-zinc-100/50 border-zinc-200'
                  : 'bg-zinc-800/50 border-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono ${
                  mode === 'light' ? 'text-zinc-600' : 'text-zinc-500'
                }`}>{key}</span>
                <span className={`text-xs font-mono ${
                  mode === 'light' ? 'text-zinc-700' : 'text-zinc-400'
                }`}>{token.value}</span>
              </div>
              <p
                className={`${
                  mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
                }`}
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
        <h3 className={`text-sm font-medium ${
          mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
        }`}>Line Heights</h3>
        <div className="space-y-3">
          {Object.entries(lineHeights).map(([key, token]) => (
            <div
              key={key}
              className={`p-3 rounded-lg border ${
                mode === 'light'
                  ? 'bg-zinc-100/50 border-zinc-200'
                  : 'bg-zinc-800/50 border-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono ${
                  mode === 'light' ? 'text-zinc-600' : 'text-zinc-500'
                }`}>{key}</span>
                <span className={`text-xs font-mono ${
                  mode === 'light' ? 'text-zinc-700' : 'text-zinc-400'
                }`}>{token.value}</span>
              </div>
              <p
                className={`text-sm ${
                  mode === 'light' ? 'text-zinc-800' : 'text-zinc-300'
                }`}
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
