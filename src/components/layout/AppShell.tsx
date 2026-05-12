import React from 'react';
import { ConfigPanel } from '../config/ConfigPanel';
import { PreviewPanel } from '../preview/PreviewPanel';
import { ExportPanel } from '../export/ExportPanel';
import { useTokenStore } from '../../stores/tokenStore';

export const AppShell: React.FC = () => {
  const { mode } = useTokenStore();
  
  return (
    <div className={`transition-colors duration-300 ${
      mode === 'light' ? 'bg-white' : 'bg-zinc-950'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 space-y-6">
            <ConfigPanel />
            <ExportPanel />
          </aside>

          <main className="lg:col-span-8">
            <PreviewPanel />
          </main>
        </div>
      </div>
    </div>
  );
};
