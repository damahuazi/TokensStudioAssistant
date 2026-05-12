import React from 'react';
import { ConfigPanel } from '../config/ConfigPanel';
import { PreviewPanel } from '../preview/PreviewPanel';
import { Sidebar } from './Sidebar';
import { useTokenStore } from '../../stores/tokenStore';

export const AppShell: React.FC = () => {
  const { mode } = useTokenStore();
  
  return (
    <div className="flex min-h-full">
      <Sidebar />
      
      <div className="w-80 shrink-0 overflow-y-auto border-r transition-colors duration-300"
        style={{ borderColor: mode === 'light' ? '#e5e7eb' : '#3f3f46' }}>
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
  );
};
