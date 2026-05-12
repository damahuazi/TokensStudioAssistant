import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Palette, Type, Grid, Sun, Moon } from 'lucide-react';
import { ColorPalette } from './ColorPalette';
import { TypographyList } from './TypographyList';
import { ThemePreview } from './ThemePreview';
import { ComponentSandbox } from '../sandbox/ComponentSandbox';
import { useTokenStore } from '../../stores/tokenStore';

interface PreviewSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({
  title,
  icon,
  children,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { mode } = useTokenStore();

  return (
    <div className={`border rounded-xl overflow-hidden backdrop-blur-sm transition-colors duration-300 ${
      mode === 'light' 
        ? 'border-zinc-200 bg-white/50' 
        : 'border-zinc-800 bg-zinc-900/50'
    }`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
          mode === 'light'
            ? 'hover:bg-zinc-100/50'
            : 'hover:bg-zinc-800/50'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className={mode === 'light' ? 'text-zinc-600' : 'text-zinc-400'}>{icon}</span>
          <span className={`text-sm font-medium ${
            mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
          }`}>{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className={`w-4 h-4 ${mode === 'light' ? 'text-zinc-500' : 'text-zinc-400'}`} />
        ) : (
          <ChevronDown className={`w-4 h-4 ${mode === 'light' ? 'text-zinc-500' : 'text-zinc-400'}`} />
        )}
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
};

export const PreviewPanel: React.FC = () => {
  const { mode, editMode, toggleMode } = useTokenStore();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h2 className={`text-lg font-semibold ${
          mode === 'light' ? 'text-zinc-900' : 'text-zinc-100'
        }`}>Preview</h2>
        <button
          onClick={toggleMode}
          className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 ${
            mode === 'light'
              ? 'bg-zinc-100 border-zinc-200 hover:border-zinc-300'
              : 'bg-zinc-800 border-zinc-700 hover:border-zinc-600'
          }`}
        >
          {mode === 'light' ? (
            <Sun className="w-4 h-4 text-yellow-500" />
          ) : (
            <Moon className="w-4 h-4 text-blue-400" />
          )}
          <span className={`text-xs font-medium capitalize ${
            mode === 'light' ? 'text-zinc-700' : 'text-zinc-300'
          }`}>
            {mode}
          </span>
        </button>
      </div>

      {editMode === 'color' ? (
        <>
          <PreviewSection title="Color Palette" icon={<Palette className="w-4 h-4" />} defaultOpen={true}>
            <ColorPalette />
          </PreviewSection>

          <PreviewSection title="Light Theme" icon={<Sun className="w-4 h-4" />} defaultOpen={true}>
            <ThemePreview mode="light" />
          </PreviewSection>

          <PreviewSection title="Dark Theme" icon={<Moon className="w-4 h-4" />} defaultOpen={false}>
            <ThemePreview mode="dark" />
          </PreviewSection>

          <PreviewSection title="Component Sandbox" icon={<Grid className="w-4 h-4" />} defaultOpen={true}>
            <ComponentSandbox />
          </PreviewSection>
        </>
      ) : (
        <>
          <PreviewSection title="Typography" icon={<Type className="w-4 h-4" />} defaultOpen={true}>
            <TypographyList />
          </PreviewSection>
        </>
      )}
    </div>
  );
};
