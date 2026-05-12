import React from 'react';
import { Palette, Type, Sliders, Code } from 'lucide-react';
import { ColorPicker } from './ColorPicker';
import { ScaleSlider } from './ScaleSlider';
import { FontConfig } from './FontConfig';
import { useTokenStore } from '../../stores/tokenStore';

export const ConfigPanel: React.FC = () => {
  const { mode, editMode, showJsonPreview, setShowJsonPreview } = useTokenStore();

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
        
        <div className={`pt-4 border-t transition-colors duration-300 ${
          mode === 'light' ? 'border-zinc-200' : 'border-zinc-800'
        }`}>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={showJsonPreview}
              onChange={(e) => setShowJsonPreview(e.target.checked)}
              className={`w-4 h-4 rounded border transition-colors duration-200 ${
                mode === 'light' 
                  ? 'border-zinc-300 bg-white focus:ring-blue-500' 
                  : 'border-zinc-600 bg-zinc-800 focus:ring-blue-500'
              }`}
            />
            <div className="flex items-center gap-2">
              <Code className={`w-4 h-4 ${mode === 'light' ? 'text-zinc-500' : 'text-zinc-400'}`} />
              <span className={`text-sm ${mode === 'light' ? 'text-zinc-700' : 'text-zinc-300'}`}>
                Show JSON Preview
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
