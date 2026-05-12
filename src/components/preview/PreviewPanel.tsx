import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Palette, Type, Grid, Download } from 'lucide-react';
import { ColorPalette } from './ColorPalette';
import { TypographyList } from './TypographyList';
import { ThemeToggle } from './ThemeToggle';
import { ComponentSandbox } from '../sandbox/ComponentSandbox';

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
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-zinc-100">Preview</h2>
        <ThemeToggle />
      </div>

      <PreviewSection title="Color Palette" icon={<Palette className="w-4 h-4" />} defaultOpen={true}>
        <ColorPalette />
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
