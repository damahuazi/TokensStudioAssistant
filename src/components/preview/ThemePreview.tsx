import React from 'react';
import { useTokenStore } from '../../stores/tokenStore';
import { ColorSwatch } from './ColorSwatch';

interface ThemePreviewProps {
  mode: 'light' | 'dark';
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ mode }) => {
  const { tokens } = useTokenStore();
  const themeSet = tokens[mode];

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

  const surfaceCategories = [
    { key: 'canvas', label: 'Canvas', description: '页面大背景' },
    { key: 'default', label: 'Default', description: '组件默认背景' },
    { key: 'subtle', label: 'Subtle', description: '弱化背景' },
    { key: 'brand', label: 'Brand', description: '品牌色背景' },
    { key: 'brandSubtle', label: 'Brand Subtle', description: '极浅品牌背景' },
  ];

  const borderCategories = [
    { key: 'default', label: 'Default', description: '默认边框' },
    { key: 'strong', label: 'Strong', description: '强调边框' },
    { key: 'brand', label: 'Brand', description: '聚焦边框' },
    { key: 'error', label: 'Error', description: '错误边框' },
    { key: 'disabled', label: 'Disabled', description: '禁用边框' },
  ];

  const textCategories = [
    { key: 'primary', label: 'Primary', description: '标题、正文' },
    { key: 'secondary', label: 'Secondary', description: '副标题、Label' },
    { key: 'placeholder', label: 'Placeholder', description: '输入框占位符' },
    { key: 'onBrand', label: 'On Brand', description: '品牌背景上的文字' },
    { key: 'error', label: 'Error', description: '错误提示' },
  ];

  const renderColorGrid = (categories: typeof surfaceCategories, items: any) => {
    if (!items) return null;
    
    return (
      <div className="grid grid-cols-5 gap-2">
        {categories.map(({ key, label, description }) => {
          const token = items[key];
          if (!token) return null;
          
          const resolvedColor = resolveToken(token.value);
          return (
            <ColorSwatch
              key={`${mode}-${key}`}
              color={resolvedColor}
              name={label}
              scale={description}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-200 capitalize">
          {mode} Theme
        </h3>
        <div 
          className="w-8 h-8 rounded border border-zinc-700"
          style={{ 
            backgroundColor: resolveToken(themeSet.surface?.canvas?.value || '#ffffff') 
          }}
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <h4 className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">
            Surface 背景
          </h4>
          {renderColorGrid(surfaceCategories, themeSet.surface)}
        </div>

        <div className="space-y-3">
          <h4 className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">
            Border 边框
          </h4>
          {renderColorGrid(borderCategories, themeSet.border)}
        </div>

        <div className="space-y-3">
          <h4 className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">
            Text 文本
          </h4>
          {renderColorGrid(textCategories, themeSet.text)}
        </div>
      </div>
    </div>
  );
};
