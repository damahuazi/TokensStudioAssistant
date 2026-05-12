import React from 'react';
import { useTokenStore } from '../../stores/tokenStore';

export const JsonPreview: React.FC = () => {
  const { tokens, mode } = useTokenStore();

  const jsonString = JSON.stringify(tokens, null, 2);

  const lineCount = jsonString.split('\n').length;

  return (
    <div className="relative">
      <div className={`flex items-center justify-between px-4 py-2 border-b rounded-t-lg ${
        mode === 'light'
          ? 'bg-zinc-100 border-zinc-200'
          : 'bg-zinc-800 border-zinc-700'
      }`}>
        <span className={`text-xs font-mono ${
          mode === 'light' ? 'text-zinc-600' : 'text-zinc-400'
        }`}>
          tokens.json
        </span>
        <span className={`text-xs ${
          mode === 'light' ? 'text-zinc-500' : 'text-zinc-500'
        }`}>
          {lineCount} lines
        </span>
      </div>
      <div className={`relative overflow-auto max-h-[400px] rounded-b-lg border ${
        mode === 'light'
          ? 'bg-zinc-50 border-zinc-200'
          : 'bg-zinc-900 border-zinc-800'
      }`}>
        <pre className={`p-4 text-xs font-mono leading-relaxed ${
          mode === 'light' ? 'text-zinc-800' : 'text-zinc-300'
        }`}>
          <code>{jsonString}</code>
        </pre>
      </div>
    </div>
  );
};
