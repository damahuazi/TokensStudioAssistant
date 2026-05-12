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

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-zinc-800/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-zinc-400">{icon}</span>
          <span className="text-sm font-medium text-zinc-200">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-zinc-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-500" />
        )}
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
};

export const PreviewPanel: React.FC = () => {
  const { mode, toggleMode } = useTokenStore();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-zinc-100">Preview</h2>
        <button
          onClick={toggleMode}
          className="flex items-center gap-2 px-3 py-2 bg-zinc-800 rounded-full border border-zinc-700 hover:border-zinc-600 transition-all"
        >
          {mode === 'light' ? (
            <Sun className="w-4 h-4 text-yellow-500" />
          ) : (
            <Moon className="w-4 h-4 text-blue-400" />
          )}
          <span className="text-xs font-medium text-zinc-300 capitalize">
            {mode}
          </span>
        </button>
      </div>

      <PreviewSection title="Color Palette" icon={<Palette className="w-4 h-4" />} defaultOpen={true}>
        <ColorPalette />
      </PreviewSection>

      <PreviewSection title="Light Theme" icon={<Sun className="w-4 h-4" />} defaultOpen={true}>
        <ThemePreview mode="light" />
      </PreviewSection>

      <PreviewSection title="Dark Theme" icon={<Moon className="w-4 h-4" />} defaultOpen={false}>
        <ThemePreview mode="dark" />
      </PreviewSection>

      <PreviewSection title="Typography" icon={<Type className="w-4 h-4" />} defaultOpen={false}>
        <TypographyList />
      </PreviewSection>

      <PreviewSection title="Component Sandbox" icon={<Grid className="w-4 h-4" />} defaultOpen={true}>
        <ComponentSandbox />
      </PreviewSection>
    </div>
  );
};
