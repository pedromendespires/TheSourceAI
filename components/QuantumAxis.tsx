import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Edit2 } from 'lucide-react';

interface QuantumAxisProps {
  symbol: string;
  isMeditating: boolean;
  brainCoherence: number;
  heartCoherence: number;
  coherenceLabel: string;
  onSymbolChange?: (newSymbol: string) => void;
}

const QuantumAxis: React.FC<QuantumAxisProps> = ({ 
  symbol, 
  isMeditating, 
  brainCoherence, 
  heartCoherence, 
  coherenceLabel,
  onSymbolChange 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(symbol);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    if (!onSymbolChange) return;
    setEditValue(symbol);
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmed = editValue.trim();
    if (trimmed && onSymbolChange) {
      onSymbolChange(trimmed.substring(0, 2).toUpperCase());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditValue(symbol);
      setIsEditing(false);
    }
  };

  const highCoherence = brainCoherence > 75 || heartCoherence > 75;
  const superCoherence = brainCoherence > 75 && heartCoherence > 75;

  // Memoize lines to avoid recalculation, and only render half when not meditating
  const lines = useMemo(() => {
    const count = isMeditating ? 12 : 6;
    const step = 360 / count;
    return [...Array(count)].map((_, i) => ({
      x2: 50 + 45 * Math.cos((i * step * Math.PI) / 180),
      y2: 50 + 45 * Math.sin((i * step * Math.PI) / 180),
    }));
  }, [isMeditating]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-8 lg:py-0 transform-gpu">
      {/* Optimized Radiant Layer - Simplified when not meditating */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
        <svg 
          className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] transition-all duration-1000 gpu-accelerated" 
          viewBox="0 0 100 100"
          style={{ 
            opacity: isMeditating ? 0.25 : 0.08,
            transform: `scale(${isMeditating ? 1.1 : 1})`,
            willChange: 'opacity, transform'
          }}
        >
          <g className="transition-all duration-1000 ease-out">
            {lines.map((line, i) => (
              <line
                key={i}
                x1="50" y1="50"
                x2={line.x2}
                y2={line.y2}
                stroke="url(#rayGradient)"
                strokeWidth={isMeditating ? "0.3" : "0.15"}
                strokeLinecap="round"
              />
            ))}
          </g>
          <defs>
            <radialGradient id="rayGradient">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="relative w-full flex items-center justify-center transform-gpu">
        <div className="flex items-center justify-center">
          {/* Main Symbol Container */}
          <div 
            className={`relative group gpu-accelerated ${onSymbolChange && !isEditing ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={!isEditing ? handleStartEdit : undefined}
          >
            {/* Glows - Only active/visible when needed to save resources */}
            <div className={`absolute -inset-10 bg-blue-500/10 blur-[40px] rounded-full transition-opacity duration-1000 pointer-events-none ${highCoherence ? 'opacity-80' : 'opacity-10'}`} />
            {heartCoherence > 75 && (
              <div className="absolute -inset-12 bg-amber-400/10 blur-[50px] rounded-full transition-opacity duration-[2000ms] pointer-events-none opacity-100" />
            )}
            
            {superCoherence && (
              <div className="absolute -inset-16 bg-white/5 blur-[70px] rounded-full opacity-40 animate-pulse pointer-events-none" />
            )}

            {/* Outer Ring */}
            <div className={`
              relative w-32 h-32 md:w-40 md:h-40 rounded-full border 
              flex items-center justify-center shadow-2xl glass gpu-accelerated
              transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)
              ${highCoherence ? 'border-white/80 scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)]' : 'border-white/20 scale-100 shadow-none'}
            `} style={{ willChange: 'transform, border-color, box-shadow' }}>
              
              {/* Dynamic Path - Simplified when idle */}
              <svg className="absolute inset-0 w-full h-full -m-[1px] pointer-events-none" viewBox="0 0 100 100">
                 <path
                  d={highCoherence 
                    ? "M50 2 Q 55 10 65 10 T 80 20 T 90 35 T 98 50 T 90 65 T 80 80 T 65 90 T 50 98 T 35 90 T 20 80 T 10 65 T 2 50 T 10 35 T 20 20 T 35 10 T 50 2"
                    : "M50 2 A 48 48 0 1 1 50 98 A 48 48 0 1 1 50 2"
                  }
                  fill="none"
                  stroke={highCoherence ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.1)"}
                  strokeWidth={highCoherence ? "1" : "0.5"}
                  className="transition-all duration-1000 ease-in-out"
                />
              </svg>
              
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  maxLength={2}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-center text-6xl md:text-7xl font-serif italic text-white outline-none z-30 transform-gpu"
                />
              ) : (
                <span className={`text-6xl md:text-7xl font-serif italic text-white/95 select-none z-10 transition-all duration-500 ${highCoherence ? 'drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]' : ''}`}>
                  {symbol}
                </span>
              )}

              {onSymbolChange && !isEditing && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 pointer-events-none transform group-hover:scale-110">
                  <Edit2 size={20} className="text-white/60" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isMeditating && (
        <div className="mt-8 text-center transition-opacity duration-1000 opacity-60">
           <span className="text-[9px] uppercase tracking-[0.4em] opacity-40 font-bold block mb-2">{coherenceLabel}</span>
           <div className="flex justify-center gap-2">
             <div className={`w-1.5 h-1.5 rounded-full transition-all duration-1000 ${brainCoherence > 70 ? 'bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-white/10'}`} />
             <div className={`w-1.5 h-1.5 rounded-full transition-all duration-1000 ${heartCoherence > 70 ? 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'bg-white/10'}`} />
           </div>
        </div>
      )}
    </div>
  );
};

export default QuantumAxis;