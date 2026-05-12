import React, { useState } from 'react';
import { useTokenStore } from '../../stores/tokenStore';

type TabType = 'basics' | 'typography';

export const TypographyList: React.FC = () => {
  const { tokens, fontConfig, mode, themeColor } = useTokenStore();
  const [activeTab, setActiveTab] = useState<TabType>('basics');

  const fontSizes = tokens.global.fontSize;
  const fontWeights = tokens.global.fontWeight;
  const lineHeights = tokens.global.lineHeight;
  const typography = tokens.typography;

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

  const parseTypographyValue = (value: string) => {
    const parts = value.split(' ');
    return {
      fontSize: parts[0]?.replace('{global.fontSize.', '').replace('}', '') || '16',
      fontWeight: parts[1]?.replace('{global.fontWeight.', '').replace('}', '') || 'normal',
      lineHeight: parts[2]?.replace('{global.lineHeight.', '').replace('}', '') || 'normal',
    };
  };

  const getFontSizeValue = (key: string) => {
    return fontSizes[key]?.value || '16px';
  };

  const getFontWeightValue = (key: string) => {
    const weightMap: Record<string, string> = {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    };
    return weightMap[key] || fontWeights[key]?.value || '400';
  };

  const getLineHeightValue = (key: string) => {
    return lineHeights[key]?.value || '1.5';
  };

  const renderBasicsTab = () => (
    <div className="space-y-8">
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
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTypographyTab = () => (
    <div className="space-y-6">
      <div className="space-y-6">
        <div className="space-y-3">
          <h4 className={`text-xs uppercase tracking-wide ${
            mode === 'light' ? 'text-zinc-500' : 'text-zinc-400'
          }`}>Display</h4>
          <div className="space-y-2">
            {Object.entries(typography.display).map(([key, token]) => {
              const parsed = parseTypographyValue(token.value);
              return (
                <div
                  key={key}
                  className={`p-4 rounded-lg ${
                    mode === 'light' ? 'bg-zinc-50' : 'bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono ${
                      mode === 'light' ? 'text-zinc-600' : 'text-zinc-500'
                    }`}>display.{key}</span>
                    <span className={`text-xs font-mono ${
                      mode === 'light' ? 'text-zinc-500' : 'text-zinc-400'
                    }`}>
                      {getFontSizeValue(parsed.fontSize)}
                    </span>
                  </div>
                  <p
                    className={mode === 'light' ? 'text-zinc-900' : 'text-zinc-100'}
                    style={{
                      fontSize: getFontSizeValue(parsed.fontSize),
                      fontWeight: getFontWeightValue(parsed.fontWeight),
                      lineHeight: getLineHeightValue(parsed.lineHeight),
                      fontFamily: fontConfig.primaryFont,
                    }}
                  >
                    The quick brown fox
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className={`text-xs uppercase tracking-wide ${
            mode === 'light' ? 'text-zinc-500' : 'text-zinc-400'
          }`}>Heading</h4>
          <div className="space-y-2">
            {Object.entries(typography.heading).map(([key, token]) => {
              const parsed = parseTypographyValue(token.value);
              return (
                <div
                  key={key}
                  className={`p-4 rounded-lg ${
                    mode === 'light' ? 'bg-zinc-50' : 'bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono ${
                      mode === 'light' ? 'text-zinc-600' : 'text-zinc-500'
                    }`}>heading.{key}</span>
                    <span className={`text-xs font-mono ${
                      mode === 'light' ? 'text-zinc-500' : 'text-zinc-400'
                    }`}>
                      {getFontSizeValue(parsed.fontSize)}
                    </span>
                  </div>
                  <p
                    className={mode === 'light' ? 'text-zinc-900' : 'text-zinc-100'}
                    style={{
                      fontSize: getFontSizeValue(parsed.fontSize),
                      fontWeight: getFontWeightValue(parsed.fontWeight),
                      lineHeight: getLineHeightValue(parsed.lineHeight),
                      fontFamily: fontConfig.primaryFont,
                    }}
                  >
                    The quick brown fox
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className={`text-xs uppercase tracking-wide ${
            mode === 'light' ? 'text-zinc-500' : 'text-zinc-400'
          }`}>Body</h4>
          <div className="space-y-2">
            {Object.entries(typography.body).map(([key, token]) => {
              const parsed = parseTypographyValue(token.value);
              return (
                <div
                  key={key}
                  className={`p-4 rounded-lg ${
                    mode === 'light' ? 'bg-zinc-50' : 'bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono ${
                      mode === 'light' ? 'text-zinc-600' : 'text-zinc-500'
                    }`}>body.{key}</span>
                    <span className={`text-xs font-mono ${
                      mode === 'light' ? 'text-zinc-500' : 'text-zinc-400'
                    }`}>
                      {getFontSizeValue(parsed.fontSize)}
                    </span>
                  </div>
                  <p
                    className={mode === 'light' ? 'text-zinc-800' : 'text-zinc-200'}
                    style={{
                      fontSize: getFontSizeValue(parsed.fontSize),
                      fontWeight: getFontWeightValue(parsed.fontWeight),
                      lineHeight: getLineHeightValue(parsed.lineHeight),
                      fontFamily: fontConfig.primaryFont,
                    }}
                  >
                    The quick brown fox jumps over the lazy dog. Typography is the art and technique
                    of arranging type to make written language legible, readable, and appealing.
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className={`text-xs uppercase tracking-wide ${
            mode === 'light' ? 'text-zinc-500' : 'text-zinc-400'
          }`}>Label</h4>
          <div className="space-y-2">
            {Object.entries(typography.label).map(([key, token]) => {
              const parsed = parseTypographyValue(token.value);
              return (
                <div
                  key={key}
                  className={`p-4 rounded-lg ${
                    mode === 'light' ? 'bg-zinc-50' : 'bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono ${
                      mode === 'light' ? 'text-zinc-600' : 'text-zinc-500'
                    }`}>label.{key}</span>
                    <span className={`text-xs font-mono ${
                      mode === 'light' ? 'text-zinc-500' : 'text-zinc-400'
                    }`}>
                      {getFontSizeValue(parsed.fontSize)}
                    </span>
                  </div>
                  <p
                    className={mode === 'light' ? 'text-zinc-900' : 'text-zinc-100'}
                    style={{
                      fontSize: getFontSizeValue(parsed.fontSize),
                      fontWeight: getFontWeightValue(parsed.fontWeight),
                      lineHeight: getLineHeightValue(parsed.lineHeight),
                      fontFamily: fontConfig.primaryFont,
                    }}
                  >
                    Submit
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-1 border-b transition-colors duration-300"
        style={{ borderColor: mode === 'light' ? '#e5e7eb' : '#3f3f46' }}>
        <button
          onClick={() => setActiveTab('basics')}
          className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
            activeTab === 'basics'
              ? ''
              : mode === 'light'
              ? 'text-zinc-500 hover:text-zinc-700 border-transparent'
              : 'text-zinc-400 hover:text-zinc-200 border-transparent'
          }`}
          style={{
            color: activeTab === 'basics' ? themeColor : undefined,
            borderColor: activeTab === 'basics' ? themeColor : undefined,
          }}
        >
          Basics
        </button>
        <button
          onClick={() => setActiveTab('typography')}
          className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
            activeTab === 'typography'
              ? ''
              : mode === 'light'
              ? 'text-zinc-500 hover:text-zinc-700 border-transparent'
              : 'text-zinc-400 hover:text-zinc-200 border-transparent'
          }`}
          style={{
            color: activeTab === 'typography' ? themeColor : undefined,
            borderColor: activeTab === 'typography' ? themeColor : undefined,
          }}
        >
          Typography Set
        </button>
      </div>

      {activeTab === 'basics' ? renderBasicsTab() : renderTypographyTab()}
    </div>
  );
};
