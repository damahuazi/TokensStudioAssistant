import React, { useState } from 'react';
import { Palette, Sun, Moon, Grid } from 'lucide-react';
import { ColorPalette } from './ColorPalette';
import { TypographyList } from './TypographyList';
import { ThemePreview } from './ThemePreview';
import { ComponentSandbox } from '../sandbox/ComponentSandbox';
import { useTokenStore } from '../../stores/tokenStore';

type ColorTabType = 'palette' | 'light' | 'dark' | 'components';
type TypoTabType = 'basics' | 'typography';

export const PreviewPanel: React.FC = () => {
  const { editMode, themeColor, mode } = useTokenStore();
  const [activeColorTab, setActiveColorTab] = useState<ColorTabType>('palette');
  const [activeTypoTab, setActiveTypoTab] = useState<TypoTabType>('basics');

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
      <div className="flex-shrink-0">
        <div className="flex gap-1 border-b transition-colors duration-300"
          style={{ borderColor: mode === 'light' ? '#e5e7eb' : '#3f3f46' }}>
          {editMode === 'color' ? (
            colorTabs.map((tab) => (
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
            ))
          ) : (
            <>
              <button
                onClick={() => setActiveTypoTab('basics')}
                className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
                  activeTypoTab === 'basics'
                    ? ''
                    : mode === 'light'
                    ? 'text-zinc-500 hover:text-zinc-700 border-transparent'
                    : 'text-zinc-400 hover:text-zinc-200 border-transparent'
                }`}
                style={{
                  color: activeTypoTab === 'basics' ? themeColor : undefined,
                  borderColor: activeTypoTab === 'basics' ? themeColor : undefined,
                }}
              >
                Basics
              </button>
              <button
                onClick={() => setActiveTypoTab('typography')}
                className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
                  activeTypoTab === 'typography'
                    ? ''
                    : mode === 'light'
                    ? 'text-zinc-500 hover:text-zinc-700 border-transparent'
                    : 'text-zinc-400 hover:text-zinc-200 border-transparent'
                }`}
                style={{
                  color: activeTypoTab === 'typography' ? themeColor : undefined,
                  borderColor: activeTypoTab === 'typography' ? themeColor : undefined,
                }}
              >
                Typography Set
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 p-0">
        <div className="py-4">
          {editMode === 'color' ? (
            renderColorPreview()
          ) : (
            <TypographyList activeTab={activeTypoTab} />
          )}
        </div>
      </div>
    </div>
  );
};
