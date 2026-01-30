
import React, { useState, useEffect } from 'react';
import { 
  TRANSLATIONS,
  BRAIN_ICON, 
  HEART_ICON,
} from './constants';
import { ManifestationState, QuantumInsight } from './types';
import ListColumn from './components/ListColumn';
import QuantumAxis from './components/QuantumAxis';
import MeditationOverlay from './components/MeditationOverlay';
import { getQuantumInsight } from './services/geminiService';
import { Sparkles, Brain, Heart, Zap, Fingerprint, Loader2, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const t = TRANSLATIONS[lang];

  const [state, setState] = useState<ManifestationState>({
    intentions: t.initialIntentions,
    emotions: t.initialEmotions,
    potentialSymbol: 'J'
  });
  
  const [isMeditating, setIsMeditating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [insight, setInsight] = useState<QuantumInsight | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);
  
  const [brainCoherence, setBrainCoherence] = useState(50);
  const [heartCoherence, setHeartCoherence] = useState(50);

  // Auto-calculate coherence values
  useEffect(() => {
    const bBase = 30;
    const bBonus = state.intentions.length * 8;
    const bTextLength = state.intentions.reduce((acc, curr) => acc + curr.text.length, 0) / 10;
    setBrainCoherence(Math.min(100, bBase + bBonus + bTextLength));

    const hBase = 30;
    const hBonus = state.emotions.length * 12;
    const hTextLength = state.emotions.reduce((acc, curr) => acc + curr.text.length, 0) / 8;
    setHeartCoherence(Math.min(100, hBase + hBonus + hTextLength));
  }, [state]);

  const addIntention = (text: string) => {
    setState(prev => ({
      ...prev,
      intentions: [...prev.intentions, { id: Date.now().toString(), text }]
    }));
  };

  const addEmotion = (text: string) => {
    setState(prev => ({
      ...prev,
      emotions: [...prev.emotions, { id: Date.now().toString(), text }]
    }));
  };

  const removeIntention = (id: string) => {
    setState(prev => ({
      ...prev,
      intentions: prev.intentions.filter(i => i.id !== id)
    }));
  };

  const removeEmotion = (id: string) => {
    setState(prev => ({
      ...prev,
      emotions: prev.emotions.filter(e => e.id !== id)
    }));
  };

  const updatePotentialSymbol = (newSymbol: string) => {
    if (newSymbol.trim()) {
      setState(prev => ({
        ...prev,
        potentialSymbol: newSymbol.trim().substring(0, 2).toUpperCase()
      }));
    }
  };

  const handleAnalyse = async () => {
    setIsLoadingInsight(true);
    try {
      const result = await getQuantumInsight(state, lang);
      setInsight(result);
      setBrainCoherence(prev => Math.min(100, (prev + result.alignmentScore) / 2));
      setHeartCoherence(prev => Math.min(100, (prev + result.alignmentScore) / 2));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingInsight(false);
    }
  };

  const startMeditation = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsMeditating(true);
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden pb-20 selection:bg-blue-500/30 transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {/* Transition Ripple Effect */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
          <div className="absolute w-32 h-32 rounded-full border-4 border-white/50 animate-[expand_1s_ease-out_forwards]" />
          <div className="absolute w-32 h-32 rounded-full border-2 border-blue-400/30 animate-[expand_1.2s_ease-out_forwards_0.1s]" />
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm animate-[flash_0.8s_ease-in-out_forwards]" />
        </div>
      )}

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-600/5 blur-[120px] rounded-full" />
      </div>

      {/* Language Toggle */}
      <div className="fixed top-6 right-6 z-50 animate-in fade-in duration-1000">
        <div className="flex p-1 glass rounded-full border border-white/10 shadow-lg">
          <button 
            onClick={() => setLang('pt')}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all duration-300 ${lang === 'pt' ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'text-white/40 hover:text-white/60'}`}
          >
            PT
          </button>
          <button 
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all duration-300 ${lang === 'en' ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'text-white/40 hover:text-white/60'}`}
          >
            EN
          </button>
        </div>
      </div>

      <header className="pt-12 pb-8 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.3em] uppercase mb-4 text-blue-400 animate-in fade-in slide-in-from-top-4 duration-1000">
          <Zap size={14} /> {t.badge}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-200">
          {t.title}
        </h1>
        <div className="max-w-2xl mx-auto animate-in fade-in duration-1000 delay-500">
          <p className="text-white/40 text-sm md:text-base font-light italic leading-relaxed mb-2">
            {t.quote}
          </p>
          <p className="text-white/20 text-xs md:text-sm font-medium tracking-widest uppercase">
            {t.author}
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-start relative mt-8 lg:mt-16">
        <section className="order-2 lg:order-1 h-full animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
           <ListColumn 
             title={t.intentionTitle} 
             subtitle={t.intentionSubtitle}
             items={state.intentions}
             color="blue"
             onAdd={addIntention}
             onRemove={removeIntention}
             icon={BRAIN_ICON}
           />
        </section>

        <section className="order-1 lg:order-2 flex flex-col items-center justify-center gap-12 py-12 animate-in fade-in zoom-in-95 duration-1000">
          <QuantumAxis 
            symbol={state.potentialSymbol} 
            isMeditating={isMeditating || isTransitioning}
            brainCoherence={brainCoherence}
            heartCoherence={heartCoherence}
            onSymbolChange={updatePotentialSymbol}
            coherenceLabel={t.coherenceTitle}
          />

          <div className="flex flex-col gap-4 w-64 md:w-72 relative">
            <button
              onClick={startMeditation}
              className={`group relative flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all duration-500 overflow-hidden active:scale-95 transform-gpu ${isTransitioning ? 'opacity-0 scale-90' : 'opacity-100'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Sparkles size={18} className="text-blue-400 transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span className="text-sm font-bold uppercase tracking-widest">{t.activateButton}</span>
            </button>

            <button
              onClick={handleAnalyse}
              disabled={isLoadingInsight}
              className={`group flex items-center justify-center gap-3 px-8 py-3 rounded-2xl transition-all duration-500 active:scale-95 transform-gpu ${
                isLoadingInsight 
                ? 'bg-blue-500/10 border-blue-500/30 shadow-blue-glow border' 
                : 'bg-transparent hover:bg-white/5 border border-white/5 shadow-none'
              } ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
            >
              {isLoadingInsight ? (
                <div className="flex items-center gap-2">
                  <Fingerprint size={16} className="text-blue-400 animate-pulse" />
                  <Loader2 size={12} className="animate-spin opacity-40 text-blue-400" />
                </div>
              ) : (
                <Fingerprint size={16} className="opacity-40 transition-transform group-hover:scale-110" />
              )}
              <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${isLoadingInsight ? 'text-blue-400/80' : 'opacity-60'}`}>
                {t.analyseButton}
              </span>
            </button>
          </div>
        </section>

        <section className="order-3 h-full animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
          <ListColumn 
             title={t.emotionTitle} 
             subtitle={t.emotionSubtitle}
             items={state.emotions}
             color="gold"
             onAdd={addEmotion}
             onRemove={removeEmotion}
             icon={HEART_ICON}
           />
        </section>
      </main>

      {/* Insight Panel */}
      {insight && !isLoadingInsight && (
        <div className="container mx-auto px-6 mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
           <div className="glass border-blue-500/20 rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl shadow-blue-500/10 transform-gpu transition-all hover:translate-y-[-4px]">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity size={14} className="text-blue-400 animate-pulse" />
                    <h3 className="text-xs uppercase tracking-widest text-blue-400 font-bold">{lang === 'pt' ? 'Assinatura do Novo Futuro' : 'New Future Signature'}</h3>
                  </div>
                  <h4 className="text-2xl font-serif italic mb-4">"{insight.title}"</h4>
                  <p className="text-sm text-white/60 leading-relaxed font-light">
                    {insight.description}
                  </p>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="relative w-32 h-32 flex items-center justify-center transform-gpu">
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/10" />
                      <circle 
                        cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="6" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 58}
                        strokeDashoffset={2 * Math.PI * 58 * (1 - insight.alignmentScore / 100)}
                        strokeLinecap="round"
                        className="text-blue-400 transition-all duration-[1500ms] ease-out-expo"
                      />
                    </svg>
                    <span className="text-3xl font-bold font-mono">{insight.alignmentScore}%</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest opacity-40 mt-3 font-bold">{lang === 'pt' ? 'Alinhamento' : 'Alignment'}</span>
                </div>
              </div>
           </div>
        </div>
      )}

      {/* Coherence Modules */}
      <footer className="container mx-auto px-6 mt-24 text-center max-w-5xl relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative z-10">
          {/* Brain Module */}
          <div className="relative group">
            <div className={`relative glass p-10 rounded-[3rem] border-blue-500/20 flex flex-col items-center transition-all duration-700 hover:translate-y-[-8px] transform-gpu ${brainCoherence > 80 ? 'shadow-[0_0_50px_rgba(59,130,246,0.15)]' : ''}`}>
              <div className="relative mb-8 transform-gpu transition-transform duration-700 group-hover:scale-105">
                <div className={`absolute inset-0 bg-blue-400/20 blur-xl rounded-full transition-opacity duration-1000 ${brainCoherence > 70 ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
                <div className={`relative w-24 h-24 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 transition-all duration-700 ${brainCoherence > 85 ? 'scale-110 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.3)]' : ''}`}>
                  <Brain size={48} strokeWidth={1.25} className={brainCoherence > 85 ? 'animate-[pulse_2s_infinite]' : ''} />
                </div>
              </div>
              <div className="w-full mb-6 text-left">
                <div className="flex justify-center items-center mb-3">
                   <div className="flex items-center gap-3">
                     <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-400/80">{t.brainModule}</h3>
                     <Activity size={12} className={`text-blue-400/40 ${brainCoherence > 75 ? 'animate-pulse' : ''}`} />
                   </div>
                </div>
                <div className="h-2.5 w-full bg-slate-900/50 rounded-full overflow-hidden relative transform-gpu border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-800 via-blue-500 to-cyan-300 transition-all duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) relative rounded-full"
                    style={{ width: `${brainCoherence}%` }}
                  >
                    {/* Glowing Tip */}
                    <div className="absolute top-0 right-0 h-full w-2 bg-white/60 blur-sm rounded-full animate-pulse" />
                    {/* Shimmer Effect */}
                    <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md animate-[shimmer_2.5s_infinite_linear]" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-white/50 leading-relaxed font-light italic max-w-[240px]">
                  {t.brainQuote}
                </p>
                <span className="text-[9px] uppercase tracking-[0.3em] font-mono opacity-25">{t.author}</span>
              </div>
            </div>
          </div>

          {/* Heart Module */}
          <div className="relative group">
            <div className={`relative glass p-10 rounded-[3rem] border-amber-500/20 flex flex-col items-center transition-all duration-700 hover:translate-y-[-8px] transform-gpu ${heartCoherence > 80 ? 'shadow-[0_0_50px_rgba(245,158,11,0.15)]' : ''}`}>
              <div className="relative mb-8 transform-gpu transition-transform duration-700 group-hover:scale-105">
                <div className={`absolute inset-0 bg-amber-400/20 blur-xl rounded-full transition-opacity duration-1000 ${heartCoherence > 70 ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
                <div className={`relative w-24 h-24 rounded-3xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20 transition-all duration-700 ${heartCoherence > 85 ? 'scale-110 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)]' : ''}`}>
                  <Heart size={48} strokeWidth={1.25} className={heartCoherence > 85 ? 'animate-[pulse_2s_infinite]' : ''} />
                </div>
              </div>
              <div className="w-full mb-6 text-left">
                <div className="flex justify-center items-center mb-3">
                   <div className="flex items-center gap-3">
                     <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-400/80">{t.heartModule}</h3>
                     <Activity size={12} className={`text-amber-400/40 ${heartCoherence > 75 ? 'animate-pulse' : ''}`} />
                   </div>
                </div>
                <div className="h-2.5 w-full bg-slate-900/50 rounded-full overflow-hidden relative transform-gpu border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-800 via-amber-500 to-orange-300 transition-all duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) relative rounded-full"
                    style={{ width: `${heartCoherence}%` }}
                  >
                    {/* Glowing Tip */}
                    <div className="absolute top-0 right-0 h-full w-2 bg-white/60 blur-sm rounded-full animate-pulse" />
                    {/* Shimmer Effect */}
                    <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md animate-[shimmer_2.5s_infinite_linear]" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-white/50 leading-relaxed font-light italic max-w-[240px]">
                  {t.heartQuote}
                </p>
                <span className="text-[9px] uppercase tracking-[0.3em] font-mono opacity-25">{t.author}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-12 relative z-10 opacity-60">
          <p className="text-xs text-white/40 font-light leading-loose">
            {t.footerText}
          </p>
        </div>
      </footer>

      {isMeditating && (
        <MeditationOverlay 
          symbol={state.potentialSymbol} 
          onClose={() => setIsMeditating(false)} 
          lang={lang}
        />
      )}
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateX(150%); opacity: 0; }
        }
        @keyframes expand {
          from { transform: scale(1); opacity: 1; border-width: 4px; }
          to { transform: scale(40); opacity: 0; border-width: 1px; }
        }
        @keyframes flash {
          0% { background-color: transparent; }
          50% { background-color: rgba(255, 255, 255, 0.4); }
          100% { background-color: transparent; }
        }
        .ease-out-expo {
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
        }
      `}</style>
    </div>
  );
};

export default App;
