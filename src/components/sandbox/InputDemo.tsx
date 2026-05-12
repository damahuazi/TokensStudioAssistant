import React, { useState } from 'react';
import { useTokenStore } from '../../stores/tokenStore';

export const InputDemo: React.FC = () => {
  const { tokens, mode } = useTokenStore();
  const [focused, setFocused] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const semantic = tokens.semantic[mode];
  const global = tokens.global;

  const getResolvedValue = (tokenPath: string): string => {
    const parts = tokenPath.replace(/[{}]/g, '').split('.');
    let value: any = tokens;
    for (const part of parts) {
      value = value?.[part];
    }
    return typeof value === 'string' ? value : value?.value || tokenPath;
  };

  const inputStyles = {
    backgroundColor: disabled
      ? getResolvedValue('{global.color.neutral.100}')
      : semantic.background?.primary?.value
        ? getResolvedValue(semantic.background.primary.value)
        : '#fafafa',
    borderColor: focused
      ? getResolvedValue(semantic.border?.focus?.value || '{global.color.brand.500}')
      : disabled
        ? getResolvedValue('{global.color.neutral.200}')
        : getResolvedValue(semantic.border?.default?.value || '{global.color.neutral.200}'),
    color: disabled
      ? getResolvedValue('{global.color.neutral.400}')
      : getResolvedValue(semantic.foreground?.primary?.value || '{global.color.neutral.900}'),
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
