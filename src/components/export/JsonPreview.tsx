import React from 'react';
import { useTokenStore } from '../../stores/tokenStore';

export const JsonPreview: React.FC = () => {
  const { tokens } = useTokenStore();

  const jsonString = JSON.stringify(tokens, null, 2);

  const lineCount = jsonString.split('\n').length;

  return (
    <div className="relative">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 border-b border-zinc-700 rounded-t-lg">
        <span className="text-xs font-mono text-zinc-400">
          tokens.json
        </span>
        <span className="text-xs text-zinc-500">
          {lineCount} lines
        </span>
      </div>
      <div className="relative overflow-auto max-h-[400px] bg-zinc-900 rounded-b-lg border border-zinc-800">
        <pre className="p-4 text-xs font-mono text-zinc-300 leading-relaxed">
          <code>{jsonString}</code>
        </pre>
      </div>
    </div>
  );
};
