import React from 'react';
import { ChevronDown, ChevronUp, FileJson } from 'lucide-react';
import { JsonPreview } from './JsonPreview';
import { ExportButton } from './ExportButton';

export const ExportPanel: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-zinc-800/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <FileJson className="w-4 h-4 text-zinc-400" />
          <span className="text-sm font-medium text-zinc-200">Export Tokens</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-zinc-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-500" />
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
