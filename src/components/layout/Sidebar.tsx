import React, { useState } from 'react';
import { Palette, Type, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTokenStore } from '../../stores/tokenStore';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { mode, editMode, setEditMode } = useTokenStore();

  const navItems = [
    {
      id: 'color' as const,
      icon: <Palette className="w-5 h-5" />,
      label: 'Color',
    },
    {
      id: 'typography' as const,
      icon: <Type className="w-5 h-5" />,
      label: 'Typography',
    },
  ];

  return (
    <aside className={`h-full flex flex-col border-r transition-all duration-300 ${
      mode === 'light' 
        ? 'border-zinc-200 bg-white/50' 
        : 'border-zinc-800 bg-zinc-900/50'
    } ${collapsed ? 'w-16' : 'w-48'}`}>
      <nav className="flex flex-col gap-1 p-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setEditMode(item.id)}
            className={`relative flex items-center gap-3 w-full px-3 py-3 rounded-lg transition-all duration-200 group ${
              editMode === item.id
                ? mode === 'light'
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-blue-500/10 text-blue-400'
                : mode === 'light'
                  ? 'text-zinc-600 hover:bg-zinc-100'
                  : 'text-zinc-400 hover:bg-zinc-800'
            }`}
            title={collapsed ? item.label : undefined}
          >
            {editMode === item.id && (
              <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full ${
                mode === 'light' ? 'bg-blue-500' : 'bg-blue-400'
              }`} />
            )}
            <span className={`shrink-0 ${
              editMode === item.id ? 'text-blue-500' : ''
            }`}>
              {item.icon}
            </span>
            {!collapsed && (
              <span className={`text-sm font-medium ${
                mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
              }`}>
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="flex-1" />

      <div className={`p-2 border-t transition-colors duration-300 ${
        mode === 'light' ? 'border-zinc-200' : 'border-zinc-800'
      }`}>
        <button
          className={`flex items-center gap-3 w-full px-3 py-3 rounded-lg transition-all duration-200 ${
            mode === 'light'
              ? 'text-zinc-600 hover:bg-zinc-100'
              : 'text-zinc-400 hover:bg-zinc-800'
          }`}
          onClick={() => {
            const tokens = useTokenStore.getState().tokens;
            const blob = new Blob([JSON.stringify(tokens, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'tokens.json';
            a.click();
            URL.revokeObjectURL(url);
          }}
          title={collapsed ? 'Export' : undefined}
        >
          <Download className="w-5 h-5 shrink-0" />
          {!collapsed && (
            <span className={`text-sm font-medium ${
              mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
            }`}>
              Export
            </span>
          )}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`mt-1 flex items-center gap-3 w-full px-3 py-3 rounded-lg transition-all duration-200 ${
            mode === 'light'
              ? 'text-zinc-600 hover:bg-zinc-100'
              : 'text-zinc-400 hover:bg-zinc-800'
          }`}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 shrink-0" />
          ) : (
            <ChevronLeft className="w-5 h-5 shrink-0" />
          )}
          {!collapsed && (
            <span className={`text-sm font-medium ${
              mode === 'light' ? 'text-zinc-900' : 'text-zinc-200'
            }`}>
              Collapse
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};
