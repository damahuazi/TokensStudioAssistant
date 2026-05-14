import React, { useState, useMemo } from 'react';
import { RotateCcw } from 'lucide-react';
import { useComponentStore } from '../../stores/componentStore';
import { useTokenStore } from '../../stores/tokenStore';
import { PropertyValue } from '../../types/tokens';

export const ComponentConfigEditor: React.FC = () => {
  const { configs, setPropertyToken, resetPropertyToken, resetVariantConfig, getAvailableTokens } = useComponentStore();
  const { refreshTokens } = useTokenStore();
  
  const [selectedComponent, setSelectedComponent] = useState<string>('button');
  const [selectedVariant, setSelectedVariant] = useState<string>('primary');
  const [selectedState, setSelectedState] = useState<string>('default');

  const availableTokens = getAvailableTokens();

  const component = useMemo(() => configs.find((c) => c.key === selectedComponent), [configs, selectedComponent]);
  const variant = useMemo(() => component?.variants.find((v) => v.key === selectedVariant), [component, selectedVariant]);
  const state = useMemo(() => variant?.states.find((s) => s.key === selectedState), [variant, selectedState]);

  const handlePropertyChange = (propertyKey: string, token: string) => {
    setPropertyToken(selectedComponent, selectedVariant, selectedState, propertyKey, token);
    refreshTokens();
  };

  const handleResetProperty = (propertyKey: string) => {
    resetPropertyToken(selectedComponent, selectedVariant, selectedState, propertyKey);
    refreshTokens();
  };

  const handleResetVariant = () => {
    resetVariantConfig(selectedComponent, selectedVariant);
    refreshTokens();
  };

  const getPropertyToken = (propertyKey: string): string => {
    const prop = state?.properties.find((p) => {
      if (typeof p === 'string') return p === propertyKey;
      return p.key === propertyKey;
    });
    
    if (typeof prop === 'object') {
      return (prop as PropertyValue).token;
    }
    
    const property = component?.properties.find((p) => p.key === propertyKey);
    return property?.defaultToken || '';
  };

  const getPropertyTypeTokens = (type: string): string[] => {
    switch (type) {
      case 'color':
        return availableTokens.color;
      case 'spacing':
        return availableTokens.spacing;
      case 'fontSize':
        return availableTokens.fontSize;
      case 'fontWeight':
        return availableTokens.fontWeight;
      case 'borderRadius':
        return availableTokens.borderRadius;
      default:
        return [];
    }
  };

  if (!component || !variant || !state) {
    return (
      <div className="flex items-center justify-center h-64 text-zinc-500 dark:text-zinc-400">
        No configuration available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Component:</label>
          <select
            value={selectedComponent}
            onChange={(e) => {
              setSelectedComponent(e.target.value);
              const comp = configs.find((c) => c.key === e.target.value);
              if (comp?.variants.length > 0) {
                setSelectedVariant(comp.variants[0].key);
                setSelectedState(comp.variants[0].states[0].key);
              }
            }}
            className="px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {configs.filter((c) => c.enabled).map((c) => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Variant:</label>
          <select
            value={selectedVariant}
            onChange={(e) => {
              setSelectedVariant(e.target.value);
              const v = component.variants.find((v) => v.key === e.target.value);
              if (v?.states.length > 0) {
                setSelectedState(v.states[0].key);
              }
            }}
            className="px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {component.variants.filter((v) => v.enabled).map((v) => (
              <option key={v.key} value={v.key}>{v.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">State:</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {variant.states.map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleResetVariant}
          className="flex items-center gap-1 px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Variant
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-3 px-4 font-medium text-zinc-700 dark:text-zinc-300">Property</th>
              <th className="text-left py-3 px-4 font-medium text-zinc-700 dark:text-zinc-300">Token</th>
              <th className="text-right py-3 px-4 font-medium text-zinc-700 dark:text-zinc-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.properties.map((prop) => {
              const propertyKey = typeof prop === 'string' ? prop : prop.key;
              const property = component.properties.find((p) => p.key === propertyKey);
              if (!property) return null;

              const currentToken = getPropertyToken(propertyKey);
              const isCustom = typeof prop === 'object';
              const tokens = getPropertyTypeTokens(property.type);

              return (
                <tr key={propertyKey} className="border-b border-zinc-100 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-zinc-900 dark:text-zinc-200">{property.label}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
                        {property.type}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={currentToken}
                      onChange={(e) => handlePropertyChange(propertyKey, e.target.value)}
                      className={`w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isCustom
                          ? 'border-blue-300 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                          : 'border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800'
                      }`}
                    >
                      {tokens.map((token) => (
                        <option key={token} value={token}>{token}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {isCustom && (
                      <button
                        onClick={() => handleResetProperty(propertyKey)}
                        className="text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                      >
                        Reset to default
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};