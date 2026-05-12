import React from 'react';
import { ConfigPanel } from '../config/ConfigPanel';
import { PreviewPanel } from '../preview/PreviewPanel';
import { JsonPreview } from '../export/JsonPreview';
import { Sidebar } from './Sidebar';
import { SplitPanel } from './SplitPanel';
import { useTokenStore } from '../../stores/tokenStore';

export const AppShell: React.FC = () => {
  const { mode, showJsonPreview } = useTokenStore();
  
  return (
    <div className="flex h-full">
      <Sidebar />
      
      <div className="w-80 shrink-0 overflow-y-auto border-r transition-colors duration-300"
        style={{ borderColor: mode === 'light' ? '#e5e7eb' : '#3f3f46' }}>
        <div className="p-4 space-y-4">
          <ConfigPanel />
        </div>
      </div>
      
      <main className="flex-1 h-full overflow-hidden">
        {showJsonPreview ? (
          <SplitPanel 
            top={<div className="p-4"><PreviewPanel /></div>}
            bottom={<div className="p-4"><JsonPreview /></div>}
            initialRatio={0.6}
          />
        ) : (
          <div className="h-full overflow-y-auto">
            <div className="p-4">
              <PreviewPanel />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
