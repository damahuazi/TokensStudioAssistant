import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, X, RefreshCw } from 'lucide-react';
import { useComponentStore } from '../../stores/componentStore';
import { useTokenStore } from '../../stores/tokenStore';

export const ComponentConfig: React.FC = () => {
  const { configs, setComponentEnabled, setVariantEnabled, resetConfigs } = useComponentStore();
  const { refreshTokens } = useTokenStore();
  const [expandedComponent, setExpandedComponent] = useState<string | null>(null);

  const handleComponentChange = (componentKey: string, enabled: boolean) => {
    setComponentEnabled(componentKey, enabled);
    refreshTokens();
  };

  const handleVariantChange = (componentKey: string, variantKey: string, enabled: boolean) => {
    setVariantEnabled(componentKey, variantKey, enabled);
    refreshTokens();
  };

  const handleReset = () => {
    resetConfigs();
    refreshTokens();
  };

  const toggleComponent = (componentKey: string) => {
    setExpandedComponent(expandedComponent === componentKey ? null : componentKey);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-200">Component Set</h3>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 px-2 py-1 text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          Reset
        </button>
      </div>

      <div className="space-y-2">
        {configs.map((component) => (
          <div
            key={component.key}
            className={`border rounded-lg overflow-hidden transition-colors ${
              component.enabled
                ? 'border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800'
                : 'border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-850'
            }`}
          >
            <button
              onClick={() => toggleComponent(component.key)}
              className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleComponentChange(component.key, !component.enabled);
                  }}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    component.enabled
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'border-zinc-300 dark:border-zinc-600'
                  }`}
                >
                  {component.enabled && <Check className="w-3 h-3" />}
                </button>
                <span className={`text-sm font-medium ${
                  component.enabled ? 'text-zinc-900 dark:text-zinc-200' : 'text-zinc-400'
                }`}>
                  {component.label}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-500">
                  ({component.variants.filter((v) => v.enabled).length} variants)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  component.enabled
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'
                    : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400'
                }`}>
                  {component.enabled ? 'Enabled' : 'Disabled'}
                </span>
                {component.variants.length > 0 && (
                  expandedComponent === component.key ? (
                    <ChevronUp className="w-4 h-4 text-zinc-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  )
                )}
              </div>
            </button>

            {expandedComponent === component.key && component.enabled && (
              <div className="px-4 pb-4 pt-2 border-t border-zinc-100 dark:border-zinc-700">
                <div className="space-y-2">
                  {component.variants.map((variant) => (
                    <div
                      key={variant.key}
                      className="flex items-center justify-between px-3 py-2 rounded-md bg-zinc-50 dark:bg-zinc-700/50"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleVariantChange(component.key, variant.key, !variant.enabled)}
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            variant.enabled
                              ? 'bg-blue-500 border-blue-500 text-white'
                              : 'border-zinc-300 dark:border-zinc-500'
                          }`}
                        >
                          {variant.enabled && <Check className="w-2.5 h-2.5" />}
                        </button>
                        <span className={`text-sm ${
                          variant.enabled ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-400'
                        }`}>
                          {variant.label}
                        </span>
                        <span className="text-xs text-zinc-500">
                          ({variant.states.length} states)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {variant.states.slice(0, 3).map((state) => (
                          <span
                            key={state.key}
                            className="text-xs px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-600 dark:bg-zinc-600 dark:text-zinc-300"
                          >
                            {state.label}
                          </span>
                        ))}
                        {variant.states.length > 3 && (
                          <span className="text-xs text-zinc-400">+{variant.states.length - 3}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};