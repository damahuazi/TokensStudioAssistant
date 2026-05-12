import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Palette, Type, Sliders } from 'lucide-react';
import { ColorPicker } from './ColorPicker';
import { ScaleSlider } from './ScaleSlider';
import { FontConfig } from './FontConfig';

interface PanelSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const PanelSection: React.FC<PanelSectionProps> = ({ title, icon, children, defaultOpen = true }) => {
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
      {isOpen && <div className="px-4 pb-4 space-y-4">{children}</div>}
    </div>
  );
};

export const ConfigPanel: React.FC = () => {
  return (
    <div className="space-y-3">
      <PanelSection title="Color" icon={<Palette className="w-4 h-4" />} defaultOpen={true}>
        <ColorPicker />
        <ScaleSlider />
      </PanelSection>

      <PanelSection title="Typography" icon={<Type className="w-4 h-4" />} defaultOpen={false}>
        <FontConfig />
      </PanelSection>
    </div>
  );
};
