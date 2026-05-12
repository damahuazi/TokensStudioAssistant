import React, { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import { useTokenStore } from '../../stores/tokenStore';

export const ExportButton: React.FC = () => {
  const { tokens } = useTokenStore();
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    const jsonString = JSON.stringify(tokens, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tokens.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloading(false), 1000);
  };

  const handleCopy = async () => {
    const jsonString = JSON.stringify(tokens, null, 2);
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleCopy}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
          copied
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-zinc-800 text-zinc-200 border border-zinc-700 hover:bg-zinc-700'
        }`}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Copy to Clipboard
          </>
        )}
      </button>

      <button
        onClick={handleDownload}
        disabled={downloading}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm
          bg-blue-500 text-white hover:bg-blue-600 transition-all disabled:opacity-50"
      >
        <Download className={`w-4 h-4 ${downloading ? 'animate-bounce' : ''}`} />
        {downloading ? 'Downloading...' : 'Download JSON'}
      </button>
    </div>
  );
};
