import React, { useState, useMemo } from 'react';
import { RotateCcw, Check, X } from 'lucide-react';
import { useComponentStore } from '../../stores/componentStore';
import { useTokenStore } from '../../stores/tokenStore';
import { PropertyValue } from '../../types/tokens';

export const ComponentConfigEditor: React.FC = () => {
  const { 
    configs, 
    setComponentEnabled, 
    setVariantEnabled,
    setPropertyToken, 
    resetPropertyToken, 
    resetVariantConfig, 
    getAvailableTokens 
  } = useComponentStore();
  const { refreshTokens, mode } = useTokenStore();
  
  const [selectedComponent, setSelectedComponent] = useState<string>('button');
  const [selectedVariant, setSelectedVariant] = useState<string>('primary');
  const [selectedState, setSelectedState] = useState<string>('default');

  const availableTokens = getAvailableTokens();

  const component = useMemo(() => configs.find((c) => c.key === selectedComponent), [configs, selectedComponent]);
  const variant = useMemo(() => component?.variants.find((v) => v.key === selectedVariant), [component, selectedVariant]);
  const state = useMemo(() => variant?.states.find((s) => s.key === selectedState), [variant, selectedState]);

  const enabledComponents = useMemo(() => configs.filter((c) => c.enabled), [configs]);

  const handleComponentToggle = (componentKey: string) => {
    const isEnabled = configs.find((c) => c.key === componentKey)?.enabled;
    setComponentEnabled(componentKey, !isEnabled);
    
    if (!isEnabled) {
      setSelectedComponent(componentKey);
      const comp = configs.find((c) => c.key === componentKey);
      if (comp?.variants.length > 0) {
        const firstEnabled = comp.variants.find((v) => v.enabled) || comp.variants[0];
        setSelectedVariant(firstEnabled.key);
        setSelectedState(firstEnabled.states[0].key);
      }
    }
    
    refreshTokens();
  };

  const handleVariantToggle = (variantKey: string) => {
    setVariantEnabled(selectedComponent, variantKey, !variant?.enabled);
    refreshTokens();
  };

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
      <div className="flex flex-col items-center justify-center h-64 text-zinc-500 dark:text-zinc-400">
        <X className="w-12 h-12 mb-4" />
        <p>No component selected or configured</p>
        <p className="text-sm mt-2">Please enable a component to start configuring</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4">
        <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Components</h4>
        <div className="flex flex-wrap gap-2">
          {configs.map((comp) => (
            <button
              key={comp.key}
              onClick={() => handleComponentToggle(comp.key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                comp.enabled
                  ? comp.key === selectedComponent
                    ? mode === 'light'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-blue-600 text-white shadow-md'
                    : mode === 'light'
                    ? 'bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200'
                    : 'bg-zinc-700 text-zinc-200 hover:bg-zinc-600 border border-zinc-600'
                  : mode === 'light'
                  ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                  : 'bg-zinc-700/50 text-zinc-500 cursor-not-allowed'
              }`}
            >
              {comp.enabled ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border border-current" />
              )}
              {comp.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Variant:</label>
              <div className="flex flex-wrap gap-1">
                {component.variants.map((v) => (
                  <button
                    key={v.key}
                    onClick={() => {
                      if (v.enabled) {
                        setSelectedVariant(v.key);
                        setSelectedState(v.states[0].key);
                      }
                    }}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                      v.key === selectedVariant
                        ? v.enabled
                          ? mode === 'light'
                            ? 'bg-blue-500 text-white'
                            : 'bg-blue-600 text-white'
                          : 'bg-zinc-200 text-zinc-400'
                        : v.enabled
                          ? mode === 'light'
                            ? 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                            : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                    }`}
                  >
                    {v.label}
                    {!v.enabled && <span className="ml-1 opacity-50">(disabled)</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">State:</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-3 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {variant.states.map((s) => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="text-left py-3 px-4 font-medium text-zinc-700 dark:text-zinc-300 w-1/3">Property</th>
                  <th className="text-left py-3 px-4 font-medium text-zinc-700 dark:text-zinc-300 w-2/3">Token</th>
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
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
                            {property.type}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <select
                            value={currentToken}
                            onChange={(e) => handlePropertyChange(propertyKey, e.target.value)}
                            className={`flex-1 px-3 py-1.5 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              isCustom
                                ? 'border-blue-300 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                : 'border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800'
                            }`}
                          >
                            {tokens.map((token) => (
                              <option key={token} value={token}>{token}</option>
                            ))}
                          </select>
                          {isCustom && (
                            <button
                              onClick={() => handleResetProperty(propertyKey)}
                              className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                              title="Reset to default"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleResetVariant}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Variant Config
            </button>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4">Live Preview</h4>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-500">Button States:</span>
              {component.key === 'button' && component.variants.filter((v) => v.enabled).map((v) => (
                <div key={v.key} className="space-y-2">
                  <span className="text-xs text-zinc-500">{v.label}</span>
                  <div className="flex gap-2">
                    {v.states.slice(0, 4).map((s) => (
                      <button
                        key={s.key}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          s.key === 'default'
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : s.key === 'hover'
                            ? 'bg-blue-600 text-white'
                            : s.key === 'active'
                            ? 'bg-blue-700 text-white'
                            : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-500">Input States:</span>
              {component.key === 'input' && (
                <div className="space-y-2 w-full">
                  {variant.states.slice(0, 3).map((s) => (
                    <div key={s.key} className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500 w-16">{s.label}</span>
                      <input
                        type="text"
                        placeholder="Sample input"
                        className={`px-3 py-2 rounded-md border text-sm w-48 ${
                          s.key === 'default'
                            ? 'border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700'
                            : s.key === 'hover'
                            ? 'border-zinc-400 dark:border-zinc-500 bg-white dark:bg-zinc-700'
                            : 'border-blue-500 dark:border-blue-500 bg-white dark:bg-zinc-700 ring-2 ring-blue-200'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <span className="text-xs text-zinc-500 dark:text-zinc-500">Checkbox/Radio:</span>
              {(component.key === 'checkbox' || component.key === 'radio') && (
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                    <span className="text-sm">Checked</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    <span className="text-sm">Unchecked</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};