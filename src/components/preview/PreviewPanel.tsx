import React, { useState } from 'react';
import { Palette, Sun, Moon, Grid } from 'lucide-react';
import { ColorPalette } from './ColorPalette';
import { TypographyList } from './TypographyList';
import { ThemePreview } from './ThemePreview';
import { ComponentSandbox } from '../sandbox/ComponentSandbox';
import { useTokenStore } from '../../stores/tokenStore';

type ColorTabType = 'palette' | 'light' | 'dark' | 'components';

export const PreviewPanel: React.FC = () => {
  const { editMode, themeColor } = useTokenStore();
  const [activeColorTab, setActiveColorTab] = useState<ColorTabType>('palette');

  const colorTabs = [
    { key: 'palette' as ColorTabType, label: 'Palette', icon: <Palette className="w-4 h-4" /> },
    { key: 'light' as ColorTabType, label: 'Light', icon: <Sun className="w-4 h-4" /> },
    { key: 'dark' as ColorTabType, label: 'Dark', icon: <Moon className="w-4 h-4" /> },
    { key: 'components' as ColorTabType, label: 'Components', icon: <Grid className="w-4 h-4" /> },
  ];

  const renderColorPreview = () => {
    switch (activeColorTab) {
      case 'palette':
        return <ColorPalette />;
      case 'light':
        return <ThemePreview mode="light" />;
      case 'dark':
        return <ThemePreview mode="dark" />;
      case 'components':
        return <ComponentSandbox />;
      default:
        return <ColorPalette />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {editMode === 'color' && (
        <div className="flex-shrink-0">
          <div className="flex gap-1 border-b transition-colors duration-300"
            style={{ borderColor: '#e5e7eb' }}>
            {colorTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveColorTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
                  activeColorTab === tab.key
                    ? ''
                    : 'text-zinc-500 hover:text-zinc-700 border-transparent'
                }`}
                style={{
                  color: activeColorTab === tab.key ? themeColor : undefined,
                  borderColor: activeColorTab === tab.key ? themeColor : undefined,
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="p-4">
          {editMode === 'color' ? (
            renderColorPreview()
          ) : (
            <TypographyList />
          )}
        </div>
      </div>
    </div>
  );
};
