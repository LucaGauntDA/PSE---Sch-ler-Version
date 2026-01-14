
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ELEMENTS, CATEGORY_COLORS } from './data';
import { ElementData, ElementCategory } from './types';
import ElementTile from './components/ElementTile';
import ElementModal from './components/ElementModal';

const App: React.FC = () => {
  const [rounded, setRounded] = useState(true);
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [isLanthanoidExpanded, setIsLanthanoidExpanded] = useState(false);
  const [isActinoidExpanded, setIsActinoidExpanded] = useState(false);
  
  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Shell Quantum mapping for the legend
  const shellQuantumMap: Record<ElementCategory, string> = {
    [ElementCategory.K]: 'n = 1',
    [ElementCategory.L]: 'n = 2',
    [ElementCategory.M]: 'n = 3',
    [ElementCategory.N]: 'n = 4',
    [ElementCategory.O]: 'n = 5',
    [ElementCategory.P]: 'n = 6',
    [ElementCategory.Q]: 'n = 7',
  };

  // Define the strict order for the legend
  const legendOrder = [
    ElementCategory.K, ElementCategory.L, ElementCategory.M, 
    ElementCategory.N, ElementCategory.O, ElementCategory.P, ElementCategory.Q
  ];

  const mainTableElements = useMemo(() => 
    ELEMENTS.filter(e => (e.atomicNumber < 58 || e.atomicNumber > 71) && (e.atomicNumber < 90 || e.atomicNumber > 103)),
  []);

  const lanthanoids = useMemo(() => 
    ELEMENTS.filter(e => e.atomicNumber >= 58 && e.atomicNumber <= 71),
  []);

  const actinoids = useMemo(() => 
    ELEMENTS.filter(e => e.atomicNumber >= 90 && e.atomicNumber <= 103),
  []);

  const matchesSearch = (el: ElementData) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      el.name.toLowerCase().includes(q) ||
      el.symbol.toLowerCase().includes(q) ||
      el.atomicNumber.toString() === q
    );
  };

  const isSearchActive = searchQuery.trim().length > 0;

  const renderTable = () => {
    const grid: React.ReactNode[] = [];
    for (let r = 1; r <= 7; r++) {
      for (let c = 1; c <= 18; c++) {
        const isExpansionCell = (r === 6 && c === 3) || (r === 7 && c === 3);
        const isLanthanoidTrigger = r === 6 && c === 3;
        const isActinoidTrigger = r === 7 && c === 3;
        const el = mainTableElements.find(e => e.period === r && e.group === c);

        if (el) {
          const isMatch = matchesSearch(el);
          grid.push(
            <div key={`el-${el.atomicNumber}`} className={`transition-all duration-300 ${isSearchActive && !isMatch ? 'opacity-10 grayscale scale-90 pointer-events-none' : 'opacity-100'}`}>
              <ElementTile element={el} rounded={rounded} onClick={setSelectedElement} />
            </div>
          );
        } else if (isExpansionCell) {
          const isActive = isLanthanoidTrigger ? isLanthanoidExpanded : isActinoidExpanded;
          const toggle = () => isLanthanoidTrigger ? setIsLanthanoidExpanded(!isLanthanoidExpanded) : setIsActinoidExpanded(!isActinoidExpanded);
          grid.push(
            <div key={`trigger-${r}-${c}`} onClick={toggle} className={`relative flex items-center justify-center cursor-pointer transition-all duration-300 border-l-4 border-white/5 border-y border-white/5 bg-slate-900/40 hover:bg-indigo-900/40 group active:scale-95 ${isActive ? 'bg-indigo-600/30 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : ''}`}>
              <div className="text-[9px] font-black text-slate-500 group-hover:text-indigo-400 text-center leading-none transition-colors uppercase tracking-widest">
                {isLanthanoidTrigger ? '58-71' : '90-103'}
                <div className={`text-lg transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>▾</div>
              </div>
            </div>
          );
        } else {
          grid.push(<div key={`empty-${r}-${c}`} className="w-full aspect-[4/5] border border-transparent" />);
        }
      }
    }
    return grid;
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-10 flex flex-col items-center bg-[#020617] overflow-y-auto selection:bg-indigo-500/30 text-slate-200">
      <div className="w-full max-w-[1500px] grid grid-cols-1 md:grid-cols-3 items-center mb-6 md:mb-12 gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] leading-none uppercase">
            Periodensystem
          </h1>
          <p className="text-indigo-400/60 font-mono text-[10px] tracking-[0.4em] mt-2 uppercase hidden md:block">
            der Elemente / Design Edition
          </p>
        </div>
        <div className="flex justify-center order-first md:order-none">
          <div className={`relative flex items-center transition-all duration-700 ease-in-out ${isSearchOpen ? 'w-full md:w-[400px] opacity-100 scale-100' : 'w-0 opacity-0 scale-90 pointer-events-none overflow-hidden'}`}>
            <input ref={searchInputRef} type="text" placeholder="Suchen..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-11 md:h-14 px-12 bg-slate-900/60 border border-white/10 rounded-2xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600 backdrop-blur-xl shadow-2xl" />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 text-indigo-500/60">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-end gap-3 pr-4 md:pr-10">
          <button onClick={() => { setIsSearchOpen(!isSearchOpen); if (isSearchOpen) setSearchQuery(''); }} className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center border transition-all active:scale-90 shadow-2xl ${isSearchOpen ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900/80 border-white/5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <button onClick={() => setRounded(!rounded)} className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-slate-900/80 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-800 transition-all text-xl md:text-2xl text-slate-400 hover:text-indigo-400 shadow-2xl active:scale-90">{rounded ? '≈' : '='}</button>
        </div>
      </div>

      <div className="w-full max-w-[1500px] overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        <div className="min-w-[1100px] lg:min-w-full ptable-grid border border-black/40 shadow-2xl bg-black/10">
          {renderTable()}
        </div>
      </div>

      <div className="w-full max-w-[1500px] flex flex-col gap-8">
        {isLanthanoidExpanded && (
          <div className="animate-in slide-in-from-top-6 fade-in duration-700 ease-out">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-grow bg-gradient-to-r from-transparent to-cyan-900/40"></div>
              <h3 className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-3 px-6 py-2 rounded-2xl bg-cyan-950/20 border border-cyan-900/20 backdrop-blur-md">
                Lanthanoide (58-71)
              </h3>
              <div className="h-px flex-grow bg-gradient-to-l from-transparent to-cyan-900/40"></div>
            </div>
            <div className="overflow-x-auto"><div className="grid grid-cols-14 min-w-[1100px] lg:min-w-full border border-black/40 bg-black/20">
              {lanthanoids.map(el => (
                <div key={`lan-${el.atomicNumber}`} className={`transition-all duration-300 ${isSearchActive && !matchesSearch(el) ? 'opacity-10 grayscale scale-90 pointer-events-none' : 'opacity-100'}`}>
                  <ElementTile element={el} rounded={rounded} onClick={setSelectedElement} />
                </div>
              ))}
            </div></div>
          </div>
        )}
        {isActinoidExpanded && (
          <div className="animate-in slide-in-from-top-6 fade-in duration-700 ease-out">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-grow bg-gradient-to-r from-transparent to-purple-900/40"></div>
              <h3 className="text-purple-400 font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-3 px-6 py-2 rounded-2xl bg-purple-950/20 border border-purple-900/20 backdrop-blur-md">
                Actinoide (90-103)
              </h3>
              <div className="h-px flex-grow bg-gradient-to-l from-transparent to-purple-900/40"></div>
            </div>
            <div className="overflow-x-auto"><div className="grid grid-cols-14 min-w-[1100px] lg:min-w-full border border-black/40 bg-black/20">
              {actinoids.map(el => (
                <div key={`act-${el.atomicNumber}`} className={`transition-all duration-300 ${isSearchActive && !matchesSearch(el) ? 'opacity-10 grayscale scale-90 pointer-events-none' : 'opacity-100'}`}>
                  <ElementTile element={el} rounded={rounded} onClick={setSelectedElement} />
                </div>
              ))}
            </div></div>
          </div>
        )}
      </div>

      {/* Legend with Shell quantum labels and Rotate-Hover effect */}
      <div className="w-full max-w-[1500px] mt-16 p-8 rounded-[2rem] bg-slate-900/30 border border-white/5 backdrop-blur-2xl">
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400/40 mb-10 text-center">Elektronenschalen-Legende</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-y-8 gap-x-4">
          {legendOrder.map((cat) => (
            <div key={cat} className="flex flex-col items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-all group cursor-default">
              <div className={`w-10 h-10 rounded-xl ${CATEGORY_COLORS[cat]} group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 ease-out`}></div>
              <div className="flex flex-col items-center leading-tight">
                <span className="text-white/80 group-hover:text-white transition-colors">{cat}</span>
                <span className="text-[8px] opacity-40 group-hover:opacity-100 transition-opacity mt-1 font-mono">{shellQuantumMap[cat]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ElementModal element={selectedElement} onClose={() => setSelectedElement(null)} />
      <style>{`
        .ptable-grid { display: grid; grid-template-columns: repeat(18, minmax(0, 1fr)); gap: 1px; }
        .grid-cols-14 { display: grid; grid-template-columns: repeat(14, minmax(0, 1fr)); gap: 1px; }
        ::-webkit-scrollbar { height: 3px; }
        ::-webkit-scrollbar-thumb { background: #312e81; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;
