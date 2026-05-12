import React from 'react';
import { Palette, Type, Sliders } from 'lucide-react';
import { ColorPicker } from './ColorPicker';
import { ScaleSlider } from './ScaleSlider';
import { FontConfig } from './FontConfig';
import { useTokenStore } from '../../stores/tokenStore';

export const ConfigPanel: React.FC = () => {
  const { mode, editMode } = useTokenStore();

  return (
    <div className={`border rounded-xl backdrop-blur-sm transition-colors duration-300 ${
      mode === 'light' 
        ? 'border-zinc-200 bg-white/50' 
        : 'border-zinc-800 bg-zinc-900/50'
    }`}>
      <div className={`px-4 py-3 border-b flex items-center gap-2 transition-colors duration-300 ${
        mode === 'light' ? 'border-zinc-200' : 'border-zinc-800'
      }`}>
        {editMode === 'color' ? (
          <>
            <Palette className={`w-4 h-4 ${mode === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
            <span className={`text-sm font-medium ${
              mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
            }`}>Color</span>
          </>
        ) : (
          <>
            <Type className={`w-4 h-4 ${mode === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
            <span className={`text-sm font-medium ${
              mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
            }`}>Typography</span>
          </>
        )}
      </div>

      <div className="p-4 space-y-4">
        {editMode === 'color' ? (
          <>
            <ColorPicker />
            <ScaleSlider />
          </>
        ) : (
          <FontConfig />
        )}
      </div>
    </div>
  );
};
