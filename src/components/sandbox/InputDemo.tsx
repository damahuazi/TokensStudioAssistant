import React, { useState } from 'react';
import { useTokenStore } from '../../stores/tokenStore';

export const InputDemo: React.FC = () => {
  const { tokens, mode } = useTokenStore();
  const [focused, setFocused] = useState(false);
  const [disabled, setDisabled] = useState(false);

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

  const inputStyles = {
    backgroundColor: disabled
      ? resolveToken(global.color.neutral['100'].value)
      : resolveToken(themeSet.background?.primary?.value || '#ffffff'),
    borderColor: focused
      ? resolveToken(themeSet.border?.focus?.value || global.color.brand['500'].value)
      : disabled
        ? resolveToken(global.color.neutral['200'].value)
        : resolveToken(themeSet.border?.default?.value || global.color.neutral['200'].value),
    color: disabled
      ? resolveToken(global.color.neutral['400'].value)
      : resolveToken(themeSet.foreground?.primary?.value || global.color.neutral['900'].value),
    fontSize: global.typography.fontSize.base.value,
    borderRadius: global.radius.md.value,
    padding: `${global.spacing.sm.value} ${global.spacing.md.value}`,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm font-medium text-zinc-200">Input States:</label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
            className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-xs text-zinc-400">Disabled</span>
        </label>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs text-zinc-500 uppercase tracking-wide">Default</label>
          <input
            type="text"
            placeholder="Enter your email..."
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full border transition-all duration-200 outline-none"
            style={inputStyles}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-zinc-500 uppercase tracking-wide">With Label</label>
          <div className="space-y-1">
            <label className="text-xs text-zinc-400">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              disabled={disabled}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full border transition-all duration-200 outline-none"
              style={inputStyles}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-zinc-500 uppercase tracking-wide">With Helper Text</label>
          <div className="space-y-1">
            <input
              type="text"
              placeholder="Username"
              disabled={disabled}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full border transition-all duration-200 outline-none"
              style={inputStyles}
            />
            <p className="text-xs text-zinc-500">
              3-20 characters, letters and numbers only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
