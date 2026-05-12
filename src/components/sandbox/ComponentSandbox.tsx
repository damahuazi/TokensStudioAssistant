import React, { useState } from 'react';
import { Square, MousePointer } from 'lucide-react';
import { InputDemo } from './InputDemo';
import { ButtonDemo } from './ButtonDemo';

type DemoType = 'input' | 'button';

export const ComponentSandbox: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<DemoType>('input');

  const tabs = [
    { key: 'input' as const, label: 'Input', icon: Square },
    { key: 'button' as const, label: 'Button', icon: MousePointer },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-1 bg-zinc-800 rounded-lg w-fit">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveDemo(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeDemo === key
                ? 'bg-zinc-700 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="p-4 bg-zinc-800/30 rounded-xl border border-zinc-800">
        {activeDemo === 'input' && <InputDemo />}
        {activeDemo === 'button' && <ButtonDemo />}
      </div>
    </div>
  );
};
