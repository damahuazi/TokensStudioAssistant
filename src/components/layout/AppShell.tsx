import React from 'react';
import { ConfigPanel } from '../config/ConfigPanel';
import { PreviewPanel } from '../preview/PreviewPanel';
import { Sidebar } from './Sidebar';
import { useTokenStore } from '../../stores/tokenStore';

export const AppShell: React.FC = () => {
  const { mode } = useTokenStore();
  
  return (
    <div className={`h-screen flex flex-col overflow-hidden transition-colors duration-300 ${
      mode === 'light' ? 'bg-white' : 'bg-zinc-950'
    }`}>
      <div className="flex-1 flex">
        <div className="shrink-0 overflow-hidden">
          <Sidebar />
        </div>
        
        <div className="w-80 shrink-0 overflow-y-auto">
          <div className="p-4 space-y-4">
            <ConfigPanel />
          </div>
        </div>
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <PreviewPanel />
          </div>
        </main>
      </div>
    </div>
  );
};
