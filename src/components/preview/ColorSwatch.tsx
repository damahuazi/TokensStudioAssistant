import React from 'react';

interface ColorSwatchProps {
  color: string;
  name: string;
  scale: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  name,
  scale,
  onClick,
  isSelected = false,
}) => {
  const getContrastColor = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#18181b' : '#ffffff';
  };

  const textColor = getContrastColor(color);

  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col rounded-lg overflow-hidden transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-zinc-900' : ''
      } hover:scale-105 hover:shadow-xl`}
      style={{ backgroundColor: color }}
    >
      <div className="p-3 flex-1 flex flex-col justify-between">
        <span className="text-xs font-medium opacity-80">{name}</span>
        <div className="mt-auto">
          <span className="text-xs font-mono font-bold" style={{ color: textColor }}>
            {scale}
          </span>
          <p className="text-xs font-mono mt-1 opacity-70" style={{ color: textColor }}>
            {color.toUpperCase()}
          </p>
        </div>
      </div>
    </button>
  );
};
