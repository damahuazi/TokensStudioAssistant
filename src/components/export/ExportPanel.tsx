import React from 'react';
import { ChevronDown, ChevronUp, FileJson } from 'lucide-react';
import { JsonPreview } from './JsonPreview';
import { ExportButton } from './ExportButton';
import { useTokenStore } from '../../stores/tokenStore';

export const ExportPanel: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
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
          <FileJson className={`w-4 h-4 ${mode === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`} />
          <span className={`text-sm font-medium ${
            mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
          }`}>Export Tokens</span>
        </div>
        {isOpen ? (
          <ChevronUp className={`w-4 h-4 ${mode === 'light' ? 'text-zinc-500' : 'text-zinc-400'}`} />
        ) : (
          <ChevronDown className={`w-4 h-4 ${mode === 'light' ? 'text-zinc-500' : 'text-zinc-400'}`} />
        )}
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 space-y-4">
          <JsonPreview />
          <ExportButton />
        </div>
      )}
    </div>
  );
};
