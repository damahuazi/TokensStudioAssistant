import React from 'react';

interface ColorSwatchProps {
  color: string;
  name: string;
  scale: string;
  onClick?: () => void;
  isSelected?: boolean;
  isBaseColor?: boolean;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  name,
  scale,
  onClick,
  isSelected = false,
  isBaseColor = false,
}) => {
  const getContrastColor = (hex: string): string => {
    // Handle 3-digit hex
    if (hex.length === 4) {
      hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    // Using relative luminance formula for better contrast
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
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
      {isBaseColor && (
        <div 
          className="absolute top-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-bold"
          style={{ backgroundColor: textColor, color: color }}
        >
          BASE
        </div>
      )}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <span 
          className="text-xs font-medium" 
          style={{ color: textColor }}
        >
          {name}
        </span>
        <div className="mt-auto">
          <span 
            className="text-xs font-mono font-bold" 
            style={{ color: textColor }}
          >
            {scale}
          </span>
          <p 
            className="text-xs font-mono mt-1" 
            style={{ color: textColor }}
          >
            {color.toUpperCase()}
          </p>
        </div>
      </div>
    </button>
  );
};
