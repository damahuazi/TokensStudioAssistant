import React from 'react';
import { useTokenStore } from '../../stores/tokenStore';

export const ButtonDemo: React.FC = () => {
  const { tokens, mode, fontConfig } = useTokenStore();

  const themeSet = tokens[mode];
  const global = tokens.global;

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

  const buttonVariants = [
    { key: 'primary', label: 'Primary' },
    { key: 'secondary', label: 'Secondary' },
    { key: 'ghost', label: 'Ghost' },
  ] as const;

  const getButtonStyle = (variant: 'primary' | 'secondary' | 'ghost', hover = false) => {
    const variantTokens = tokens.components.button[variant];
    return {
      backgroundColor: resolveToken(
        hover ? variantTokens.backgroundHover.value : variantTokens.background.value
      ),
      color: resolveToken(variantTokens.foreground.value),
      borderRadius: resolveToken(variantTokens.borderRadius.value),
      padding: `${resolveToken(variantTokens.paddingY.value)} ${resolveToken(variantTokens.paddingX.value)}`,
      fontSize: resolveToken(variantTokens.fontSize.value),
      fontWeight: resolveToken(variantTokens.fontWeight.value),
      fontFamily: fontConfig.primaryFont,
    };
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-xs text-zinc-500 uppercase tracking-wide">Variants</h4>
        <div className="flex flex-wrap gap-3">
          {buttonVariants.map(({ key, label }) => (
            <button
              key={key}
              style={getButtonStyle(key)}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, getButtonStyle(key, true))}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, getButtonStyle(key))}
              className="transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs text-zinc-500 uppercase tracking-wide">With Icons</h4>
        <div className="flex flex-wrap gap-3">
          {buttonVariants.map(({ key, label }) => (
            <button
              key={key}
              style={getButtonStyle(key)}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, getButtonStyle(key, true))}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, getButtonStyle(key))}
              className="flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {label} Button
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs text-zinc-500 uppercase tracking-wide">States</h4>
        <div className="flex flex-wrap gap-3">
          <button
            style={getButtonStyle('primary')}
            className="transition-all duration-200"
          >
            Default
          </button>
          <button
            style={getButtonStyle('primary')}
            className="opacity-60 cursor-not-allowed"
            disabled
          >
            Disabled
          </button>
          <button
            style={getButtonStyle('primary', true)}
            className="transition-all duration-200"
          >
            Hover
          </button>
        </div>
      </div>
    </div>
  );
};
