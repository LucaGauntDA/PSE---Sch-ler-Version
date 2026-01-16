
import React from 'react';
import { ElementData, ElementCategory, State } from '../types';
import { CATEGORY_COLORS } from '../data';
import { TempUnit } from '../App';

interface ElementModalProps {
  element: ElementData | null;
  onClose: () => void;
  tempUnit: TempUnit;
  onToggleUnit: () => void;
}

const STATE_LABELS: Record<State, string> = {
  solid: 'fest',
  liquid: 'flüssig',
  gas: 'gasförmig',
  unknown: 'unbekannt'
};

const ElementModal: React.FC<ElementModalProps> = ({ element, onClose, tempUnit, onToggleUnit }) => {
  if (!element) return null;

  const formatTemp = (k: number | null) => {
    if (k === null) return 'N/A';
    
    let val: number;
    let unitStr: string;

    if (tempUnit === 'C') {
      val = k - 273.15;
      unitStr = '°C';
    } else if (tempUnit === 'F') {
      val = (k - 273.15) * 1.8 + 32;
      unitStr = '°F';
    } else {
      val = k;
      unitStr = 'K';
    }

    return `${val.toLocaleString('de-DE', { maximumFractionDigits: 2 })} ${unitStr}`;
  };

  const DetailRow = ({ 
    label, 
    value, 
    isClickable, 
    onClick 
  }: { 
    label: string; 
    value: string | number | null; 
    isClickable?: boolean;
    onClick?: () => void;
  }) => (
    <div 
      onClick={onClick}
      className={`flex justify-between items-center py-2 border-b border-white/10 ${isClickable ? 'cursor-pointer transition-opacity active:opacity-60' : ''}`}
    >
      <span className="text-gray-400 font-medium">{label}</span>
      <span className="text-white font-mono">
        {value ?? 'N/A'}
      </span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300">
        <div className={`${CATEGORY_COLORS[element.category]} p-6 text-black relative`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/40 transition-colors"
          >
            ✕
          </button>
          <div className="flex items-baseline gap-4">
            <h2 className="text-6xl font-bold">{element.symbol}</h2>
            <div>
              <p className="text-2xl font-semibold opacity-80">{element.name}</p>
              <p className="text-sm font-bold uppercase tracking-widest">{element.category}</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-2">
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            <DetailRow label="Protonenzahl" value={element.atomicNumber} />
            <DetailRow label="Nukleonenzahl" value={element.atomicMass} />
            <DetailRow label="Dichte" value={element.density ? `${element.density} g/cm³` : 'N/A'} />
            <DetailRow label="Zustand" value={STATE_LABELS[element.state]} />
            <DetailRow 
              label="Schmelzpunkt" 
              value={formatTemp(element.meltingPoint)} 
              isClickable={element.meltingPoint !== null}
              onClick={element.meltingPoint !== null ? onToggleUnit : undefined}
            />
            <DetailRow 
              label="Siedepunkt" 
              value={formatTemp(element.boilingPoint)} 
              isClickable={element.boilingPoint !== null}
              onClick={element.boilingPoint !== null ? onToggleUnit : undefined}
            />
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Beschreibung</h3>
            <p className="text-gray-300 leading-relaxed italic">
              "{element.summary}"
            </p>
          </div>

          <button 
            onClick={onClose}
            className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold tracking-widest uppercase text-sm transition-all border border-white/10"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElementModal;
