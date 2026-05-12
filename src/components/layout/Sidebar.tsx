import React, { useState } from 'react';
import { Palette, Type, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTokenStore } from '../../stores/tokenStore';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { mode, editMode, setEditMode, themeColor } = useTokenStore();

  const getContrastColor = (hex: string): string => {
    if (hex.length === 4) {
      hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance > 0.5 ? '#18181b' : '#ffffff';
  };

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
    <aside className={`shrink-0 flex flex-col border-r transition-all duration-300 ${
      mode === 'light' 
        ? 'border-zinc-200 bg-white/50' 
        : 'border-zinc-800 bg-zinc-900/50'
    } ${collapsed ? 'w-16' : 'w-48'}`}>
      <div className="p-2 border-b transition-colors duration-300"
        style={{ borderColor: mode === 'light' ? '#e5e7eb' : '#3f3f46' }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all duration-200 ${
            mode === 'light'
              ? 'text-zinc-600 hover:bg-zinc-100'
              : 'text-zinc-400 hover:bg-zinc-800'
          }`}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 shrink-0" />
          ) : (
            <ChevronLeft className="w-4 h-4 shrink-0" />
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

      <nav className="flex flex-col gap-1 p-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setEditMode(item.id)}
            className={`relative flex items-center gap-3 w-full px-3 py-3 rounded-lg transition-all duration-200 group ${
              editMode === item.id
                ? ''
                : mode === 'light'
                  ? 'hover:bg-zinc-100'
                  : 'hover:bg-zinc-800'
            }`}
            style={editMode === item.id ? {
              backgroundColor: themeColor + '20',
              color: themeColor
            } : {
              color: mode === 'light' ? '#52525b' : '#a1a1aa'
            }}
            title={collapsed ? item.label : undefined}
          >
            {editMode === item.id && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full" 
                style={{ backgroundColor: themeColor }} />
            )}
            <span className="shrink-0">
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
    </aside>
  );
};
