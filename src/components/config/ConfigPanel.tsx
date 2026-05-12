import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Palette, Type, Sliders } from 'lucide-react';
import { ColorPicker } from './ColorPicker';
import { ScaleSlider } from './ScaleSlider';
import { FontConfig } from './FontConfig';
import { useTokenStore } from '../../stores/tokenStore';

interface PanelSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const PanelSection: React.FC<PanelSectionProps> = ({ title, icon, children, defaultOpen = true }) => {
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
