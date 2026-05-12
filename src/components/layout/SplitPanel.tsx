import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTokenStore } from '../../stores/tokenStore';

interface SplitPanelProps {
  top: React.ReactNode;
  bottom: React.ReactNode;
  initialRatio?: number;
}

export const SplitPanel: React.FC<SplitPanelProps> = ({ 
  top, 
  bottom, 
  initialRatio = 0.6 
}) => {
  const [ratio, setRatio] = useState(initialRatio);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const { mode, themeColor } = useTokenStore();

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDraggingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const newRatio = (e.clientY - rect.top) / rect.height;
    const clampedRatio = Math.max(0.2, Math.min(0.8, newRatio));
    setRatio(clampedRatio);
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div ref={containerRef} className="flex flex-col h-full">
      <div 
        className="overflow-y-auto"
        style={{ height: `${ratio * 100}%` }}
      >
        {top}
      </div>
      
      <div 
        className={`cursor-ns-resize select-none transition-all duration-150 ${
          isHovered ? 'h-2' : 'h-1'
        }`}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: isHovered 
            ? themeColor
            : (mode === 'light' ? '#d1d5db' : '#4b5563'),
        }}
      />
      
      <div 
        className="overflow-y-auto"
        style={{ height: `${(1 - ratio) * 100}%` }}
      >
        {bottom}
      </div>
    </div>
  );
};
