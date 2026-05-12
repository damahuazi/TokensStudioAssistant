import React from 'react';
import { useTokenStore } from '../../stores/tokenStore';

export const ButtonDemo: React.FC = () => {
  const { tokens, mode, fontConfig } = useTokenStore();

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

  const buttonVariants = [
    { key: 'primary', label: 'Primary' },
    { key: 'secondary', label: 'Secondary' },
    { key: 'ghost', label: 'Ghost' },
  ] as const;

  const sizes = [
    { key: 'sm', label: 'Small' },
    { key: 'md', label: 'Medium' },
    { key: 'lg', label: 'Large' },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-xs text-zinc-500 uppercase tracking-wide">Variants</h4>
        <div className="flex flex-wrap gap-3">
          {buttonVariants.map(({ key, label }) => {
            const variant = tokens.components.button[key];
            return (
              <button
                key={key}
                className="px-4 py-2 transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: getResolvedValue(variant.background.value),
                  color: getResolvedValue(variant.foreground.value),
                  borderRadius: global.radius.md.value,
                  fontSize: global.typography.fontSize.base.value,
                  fontWeight: global.typography.fontWeight.medium.value,
                  fontFamily: fontConfig.primaryFont,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs text-zinc-500 uppercase tracking-wide">With Icons</h4>
        <div className="flex flex-wrap gap-3">
          {buttonVariants.map(({ key, label }) => {
            const variant = tokens.components.button[key];
            return (
              <button
                key={key}
                className="flex items-center gap-2 px-4 py-2 transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: getResolvedValue(variant.background.value),
                  color: getResolvedValue(variant.foreground.value),
                  borderRadius: global.radius.md.value,
                  fontSize: global.typography.fontSize.base.value,
                  fontWeight: global.typography.fontWeight.medium.value,
                  fontFamily: fontConfig.primaryFont,
                }}
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
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs text-zinc-500 uppercase tracking-wide">States</h4>
        <div className="flex flex-wrap gap-3">
          <button
            className="px-4 py-2 transition-all duration-200"
            style={{
              backgroundColor: getResolvedValue(tokens.components.button.primary.background.value),
              color: getResolvedValue(tokens.components.button.primary.foreground.value),
              borderRadius: global.radius.md.value,
              fontSize: global.typography.fontSize.base.value,
              fontWeight: global.typography.fontWeight.medium.value,
              fontFamily: fontConfig.primaryFont,
            }}
          >
            Default
          </button>
          <button
            className="px-4 py-2 transition-all duration-200 opacity-60 cursor-not-allowed"
            style={{
              backgroundColor: getResolvedValue(tokens.components.button.primary.background.value),
              color: getResolvedValue(tokens.components.button.primary.foreground.value),
              borderRadius: global.radius.md.value,
              fontSize: global.typography.fontSize.base.value,
              fontWeight: global.typography.fontWeight.medium.value,
              fontFamily: fontConfig.primaryFont,
            }}
          >
            Disabled
          </button>
          <button
            className="px-4 py-2 transition-all duration-200"
            style={{
              backgroundColor: getResolvedValue(tokens.components.button.primary.backgroundHover.value),
              color: getResolvedValue(tokens.components.button.primary.foreground.value),
              borderRadius: global.radius.md.value,
              fontSize: global.typography.fontSize.base.value,
              fontWeight: global.typography.fontWeight.medium.value,
              fontFamily: fontConfig.primaryFont,
            }}
          >
            Hover
          </button>
        </div>
      </div>
    </div>
  );
};
