import React, { useState } from 'react';
import { Square, MousePointer, Settings } from 'lucide-react';
import { InputDemo } from './InputDemo';
import { ButtonDemo } from './ButtonDemo';
import { ComponentConfigEditor } from './ComponentConfigEditor';
import { useTokenStore } from '../../stores/tokenStore';

type DemoType = 'input' | 'button' | 'config';

export const ComponentSandbox: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<DemoType>('input');
  const { mode } = useTokenStore();

  const tabs = [
    { key: 'input' as const, label: 'Input', icon: Square },
    { key: 'button' as const, label: 'Button', icon: MousePointer },
    { key: 'config' as const, label: 'Config', icon: Settings },
  ];

  return (
    <div className="space-y-4">
      <div className={`flex items-center gap-2 p-1 rounded-lg w-fit ${
        mode === 'light' ? 'bg-zinc-100' : 'bg-zinc-800'
      }`}>
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveDemo(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeDemo === key
                ? mode === 'light'
                ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200'
                : 'bg-zinc-700 text-white shadow-sm'
                : mode === 'light'
                ? 'text-zinc-600 hover:text-zinc-900'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className={`p-4 rounded-xl border ${
        mode === 'light'
          ? 'bg-zinc-50/50 border-zinc-200'
          : 'bg-zinc-800/30 border-zinc-800'
      }`}>
        {activeDemo === 'input' && <InputDemo />}
        {activeDemo === 'button' && <ButtonDemo />}
        {activeDemo === 'config' && <ComponentConfigEditor />}
      </div>
    </div>
  );
};
