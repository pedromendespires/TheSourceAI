import React, { useState } from 'react';
import { ManifestItem } from '../types';
import { Plus, X, Edit2 } from 'lucide-react';

interface ListColumnProps {
  title: string;
  subtitle: string;
  items: ManifestItem[];
  color: 'blue' | 'gold';
  onAdd: (text: string) => void;
  onRemove: (id: string) => void;
  icon: React.ReactNode;
}

const ListColumn: React.FC<ListColumnProps> = ({ 
  title, 
  subtitle, 
  items, 
  color, 
  onAdd, 
  onRemove,
  icon
}) => {
  const [inputValue, setInputValue] = useState('');

  const accentColor = color === 'blue' ? 'text-blue-400' : 'text-amber-400';
  const borderColor = color === 'blue' ? 'border-blue-500/30' : 'border-amber-500/30';
  const glowShadow = color === 'blue' ? 'shadow-blue-glow' : 'shadow-gold-glow';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className={`flex flex-col h-full glass rounded-3xl p-6 transition-all duration-700 ease-out hover:scale-[1.01] gpu-accelerated ${borderColor} ${glowShadow}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-xl bg-white/5 ${accentColor} transition-transform duration-500 group-hover:scale-110`}>
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          <p className={`text-sm opacity-60 italic`}>{subtitle}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/10">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="group flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform-gpu"
          >
            <div className="flex gap-3 items-baseline">
              <span className={`text-xs font-mono opacity-40`}>{index + 1}.</span>
              <span className="text-sm font-light leading-relaxed">{item.text}</span>
            </div>
            <button 
              onClick={() => onRemove(item.id)}
              className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-all duration-200"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Adicionar ${title.toLowerCase()}...`}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition-shadow"
        />
        <button 
          type="submit"
          className={`p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all active:scale-95 ${accentColor}`}
        >
          <Plus size={20} />
        </button>
      </form>
    </div>
  );
};

export default ListColumn;