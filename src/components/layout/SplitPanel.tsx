import React, { useState, useRef, useEffect, useCallback } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

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
        className="flex items-center justify-center h-1 cursor-ns-resize select-none bg-gradient-to-r from-transparent via-zinc-400 to-transparent"
        onMouseDown={handleMouseDown}
      >
        <div className="flex gap-0.5 p-1 rounded bg-zinc-400/50">
          <div className="w-1 h-3 rounded-full bg-zinc-600" />
          <div className="w-1 h-3 rounded-full bg-zinc-600" />
          <div className="w-1 h-3 rounded-full bg-zinc-600" />
        </div>
      </div>
      
      <div 
        className="overflow-y-auto"
        style={{ height: `${(1 - ratio) * 100}%` }}
      >
        {bottom}
      </div>
    </div>
  );
};
