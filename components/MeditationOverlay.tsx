
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface MeditationOverlayProps {
  onClose: () => void;
  symbol: string;
  lang: 'pt' | 'en';
}

const MeditationOverlay: React.FC<MeditationOverlayProps> = ({ onClose, symbol, lang }) => {
  const [breathState, setBreathState] = useState<'inspire' | 'hold' | 'expire'>('inspire');
  const [isEntering, setIsEntering] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  
  const lensRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const internalProgress = useRef(0);

  const t = TRANSLATIONS[lang];

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(onClose, 800);
  }, [onClose]);

  // Ciclo de respiração suave
  useEffect(() => {
    const sequence: Array<'inspire' | 'hold' | 'expire'> = ['inspire', 'hold', 'expire'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % sequence.length;
      setBreathState(sequence[idx]);
    }, 4500);

    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  // Loop de animação visual procedural
  useEffect(() => {
    const render = () => {
      internalProgress.current += 0.015;
      const pulse = Math.sin(internalProgress.current) * 0.5 + 0.5;
      
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          const w = canvasRef.current.width;
          const h = canvasRef.current.height;
          ctx.clearRect(0, 0, w, h);
          
          const centerX = w / 2;
          const centerY = h / 2;
          const baseRadius = 160;

          ctx.beginPath();
          ctx.lineWidth = 1;
          const auraOpacity = 0.05 + (pulse * 0.1);
          ctx.strokeStyle = `rgba(59, 130, 246, ${auraOpacity})`;
          
          for (let i = 0; i < 60; i++) {
            const angle = (i / 60) * Math.PI * 2;
            const variance = Math.sin(internalProgress.current + i * 0.2) * 15;
            const r = baseRadius + (pulse * 30) + variance;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }

      if (lensRef.current) {
        let targetScale = 1;
        if (breathState === 'inspire') targetScale = 1.12;
        else if (breathState === 'hold') targetScale = 1.05;
        else targetScale = 0.95;

        const finalScale = targetScale + (pulse * 0.02);
        lensRef.current.style.transform = `scale(${finalScale})`;
        lensRef.current.style.boxShadow = `0 0 ${40 + pulse * 20}px rgba(59, 130, 246, ${0.05 + pulse * 0.05})`;
      }

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationRef.current);
  }, [breathState]);

  const breathLabel = useMemo(() => {
    const labels = {
      inspire: t.inspire,
      hold: t.hold,
      expire: t.expire
    };
    return labels[breathState];
  }, [breathState, t]);

  const breathQuote = useMemo(() => {
    const quotes = lang === 'pt' ? {
      inspire: '"Sintonize a sua assinatura eletromagnética com o campo quântico. Sinta a energia subir."',
      hold: '"Torne-se pura consciência. No presente generoso, o tempo e o espaço colapsam."',
      expire: '"Renda-se à inteligência superior. Deixe que o Campo Unificado organize o seu novo potencial."'
    } : {
      inspire: '"Tune your electromagnetic signature with the quantum field. Feel the energy rising."',
      hold: '"Become pure consciousness. In the generous present, time and space collapse."' ,
      expire: '"Surrender to a higher intelligence. Let the Unified Field organize your new potential."'
    };
    return quotes[breathState];
  }, [breathState, lang]);

  const accentColor = useMemo(() => {
    const colors = {
      inspire: 'text-green-400',
      hold: 'text-amber-400',
      expire: 'text-blue-400'
    };
    return colors[breathState];
  }, [breathState]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center p-6 overflow-hidden transition-all duration-1000 transform-gpu ${isEntering || isExiting ? 'opacity-0 scale-[1.05] blur-3xl' : 'opacity-100 scale-100 blur-0'}`}>
      
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={800} 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50 mix-blend-screen transform-gpu" 
      />

      <div className="absolute top-8 left-8 z-[110]">
        <button 
          onClick={handleClose} 
          className="p-4 rounded-full glass border border-white/5 text-white/40 hover:text-white transition-all transform active:scale-90"
        >
          <X size={24} />
        </button>
      </div>

      <main className="relative flex flex-col items-center z-10 w-full max-w-4xl">
        <div className="flex flex-col items-center">
          <div 
            ref={lensRef} 
            className={`relative w-72 h-72 md:w-96 md:h-96 rounded-full glass border flex items-center justify-center transition-all duration-[4500ms] ease-in-out transform-gpu ${
              breathState === 'inspire' ? 'border-green-500/30' : breathState === 'hold' ? 'border-amber-500/30' : 'border-blue-500/30'
            }`}
          >
            <div className={`absolute inset-0 rounded-full border border-white/5 transition-transform duration-[9000ms] ${breathState === 'inspire' ? 'rotate-180 scale-125' : 'rotate-0 scale-100'}`} />
            <span className="text-[10rem] md:text-[14rem] font-serif italic text-white/95 select-none drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
              {symbol}
            </span>
          </div>

          <div className="mt-20 text-center max-w-2xl px-4 flex flex-col items-center min-h-[260px]">
            <h2 className={`text-2xl font-light uppercase tracking-[0.6em] mb-10 transition-all duration-1000 font-serif italic ${accentColor}`}>
              {breathLabel}
            </h2>
            <div className="flex flex-col items-center animate-in fade-in duration-1000">
              <p className="text-white/60 text-lg md:text-xl italic font-serif leading-relaxed max-w-xl transition-opacity duration-1000">
                {breathQuote}
              </p>
              <p className="mt-6 text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">
                {t.author}
              </p>
            </div>
            
            <div className="mt-12 flex items-center gap-4 opacity-10">
              <div className="h-[1px] w-12 bg-white" />
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Pure Consciousness State</span>
              <div className="h-[1px] w-12 bg-white" />
            </div>
          </div>
        </div>
      </main>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 flex items-center gap-3 pointer-events-none">
         <ShieldCheck size={14} className="text-blue-400" />
         <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/50">Space-Time Collapse Model</span>
      </div>
    </div>
  );
};

export default MeditationOverlay;
