
import React from 'react';
import { ElementData, ElementCategory } from '../types';
import { CATEGORY_COLORS } from '../data';

interface ElementTileProps {
  element: ElementData;
  rounded: boolean;
  onClick: (element: ElementData) => void;
  className?: string;
}

const ElementTile: React.FC<ElementTileProps> = ({ element, rounded, onClick, className }) => {
  const mass = rounded ? Math.round(element.atomicMass) : element.atomicMass;
  
  return (
    <div 
      onClick={() => onClick(element)}
      className={`
        relative flex flex-col items-center justify-between p-1 cursor-pointer
        transition-all duration-300 ease-out hover:z-20 active:scale-95
        w-full aspect-[4/5] min-h-[85px] border border-black/20
        ${CATEGORY_COLORS[element.category]}
        hover:brightness-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]
        hover:rounded-xl hover:scale-110
        ${className || ''}
      `}
    >
      <div className="absolute top-1 left-1.5 text-[10px] md:text-[11px] font-black leading-none text-black/40">
        {element.atomicNumber}
      </div>
      <div className="flex flex-col items-center mt-3 w-full">
        <span className="text-xl md:text-2xl font-black text-black drop-shadow-sm leading-none tracking-tight">
          {element.symbol}
        </span>
        <span className="text-[8px] md:text-[9px] font-bold text-black/60 truncate w-full text-center mt-1 uppercase tracking-tighter px-0.5">
          {element.name}
        </span>
      </div>
      <div className="text-[9px] md:text-[10px] font-mono font-black text-black/50 mb-1">
        {mass}
      </div>
    </div>
  );
};

export default ElementTile;
