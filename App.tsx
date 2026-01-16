
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ELEMENTS, CATEGORY_COLORS } from './data';
import { ElementData, ElementCategory, State, ElementClassification } from './types';
import ElementTile from './components/ElementTile';
import ElementModal from './components/ElementModal';

export type TempUnit = 'K' | 'C' | 'F';

interface Filters {
  states: State[];
  categories: ElementCategory[];
  classifications: ElementClassification[];
}

const App: React.FC = () => {
  const [rounded, setRounded] = useState(true);
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [isLanthanoidExpanded, setIsLanthanoidExpanded] = useState(false);
  const [isActinoidExpanded, setIsActinoidExpanded] = useState(false);
  
  // Temperature Unit state with localStorage
  const [tempUnit, setTempUnit] = useState<TempUnit>(() => {
    const saved = localStorage.getItem('pse_temp_unit');
    return (saved as TempUnit) || 'K';
  });

  useEffect(() => {
    localStorage.setItem('pse_temp_unit', tempUnit);
  }, [tempUnit]);

  const toggleTempUnit = () => {
    setTempUnit((prev) => {
      if (prev === 'K') return 'C';
      if (prev === 'C') return 'F';
      return 'K';
    });
  };

  const getUnitLabel = (unit: TempUnit) => {
    if (unit === 'K') return 'K';
    if (unit === 'C') return '℃';
    return '℉';
  };
  
  // Search & Filter state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({ states: [], categories: [], classifications: [] });
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Click outside logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      const isSearchClick = searchContainerRef.current?.contains(target);
      const isMatchingTileClick = target.closest('.element-match');
      const isControlClick = target.closest('.control-btn');
      const isFilterMenuClick = filterMenuRef.current?.contains(target);

      if (isFilterMenuOpen && !isFilterMenuClick && !isSearchClick) {
        setIsFilterMenuOpen(false);
        return;
      }

      if (isSearchOpen && !isSearchClick && !isMatchingTileClick && !isControlClick && !isFilterMenuClick) {
        setIsSearchOpen(false);
        setIsFilterMenuOpen(false);
        setSearchQuery('');
        setFilters({ states: [], categories: [], classifications: [] });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen, isFilterMenuOpen]);

  const toggleStateFilter = (state: State) => {
    setFilters(prev => ({
      ...prev,
      states: prev.states.includes(state) 
        ? prev.states.filter(s => s !== state) 
        : [...prev.states, state]
    }));
  };

  const toggleCategoryFilter = (cat: ElementCategory) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(cat) 
        ? prev.categories.filter(c => c !== cat) 
        : [...prev.categories, cat]
    }));
  };

  const toggleClassificationFilter = (cl: ElementClassification) => {
    setFilters(prev => ({
      ...prev,
      classifications: prev.classifications.includes(cl)
        ? prev.classifications.filter(item => item !== cl)
        : [...prev.classifications, cl]
    }));
  };

  const shellQuantumMap: Record<ElementCategory, string> = {
    [ElementCategory.K]: 'n = 1',
    [ElementCategory.L]: 'n = 2',
    [ElementCategory.M]: 'n = 3',
    [ElementCategory.N]: 'n = 4',
    [ElementCategory.O]: 'n = 5',
    [ElementCategory.P]: 'n = 6',
    [ElementCategory.Q]: 'n = 7',
  };

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

  const matchesSearchAndFilters = (el: ElementData) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      el.name.toLowerCase().includes(q) ||
      el.symbol.toLowerCase().includes(q) ||
      el.atomicNumber.toString() === q
    );

    const matchesState = filters.states.length === 0 || filters.states.includes(el.state);
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(el.category);
    const matchesClassification = filters.classifications.length === 0 || filters.classifications.includes(el.classification);

    return matchesSearch && matchesState && matchesCategory && matchesClassification;
  };

  const isFilterActive = filters.states.length > 0 || filters.categories.length > 0 || filters.classifications.length > 0;
  const isSearchActive = searchQuery.trim().length > 0 || isFilterActive;
  
  const hasNoResults = useMemo(() => {
    if (!isSearchActive) return false;
    return !ELEMENTS.some(matchesSearchAndFilters);
  }, [searchQuery, filters, isSearchActive]);

  const getMainGroupLabel = (group: number): string | null => {
    if (group === 1) return 'I';
    if (group === 2) return 'II';
    if (group === 13) return 'III';
    if (group === 14) return 'IV';
    if (group === 15) return 'V';
    if (group === 16) return 'VI';
    if (group === 17) return 'VII';
    if (group === 18) return 'VIII';
    return null;
  };

  const renderTable = () => {
    const grid: React.ReactNode[] = [];

    // Header Row: Subtile Hauptgruppen (I-VIII)
    grid.push(<div key="label-header-corner" className="w-full h-8" />); // Corner empty
    for (let c = 1; c <= 18; c++) {
      const label = getMainGroupLabel(c);
      grid.push(
        <div key={`group-label-${c}`} className="w-full h-8 flex items-center justify-center">
          <span className="text-[10px] font-black font-mono text-indigo-500/30 uppercase tracking-widest">{label}</span>
        </div>
      );
    }

    for (let r = 1; r <= 7; r++) {
      // Period Label: Subtile Periodennummer (1-7)
      grid.push(
        <div key={`period-label-${r}`} className="w-full aspect-[1/2] flex items-center justify-center">
          <span className="text-[12px] font-black font-mono text-indigo-500/30">{r}</span>
        </div>
      );

      for (let c = 1; c <= 18; c++) {
        const isExpansionCell = (r === 6 && c === 3) || (r === 7 && c === 3);
        const isLanthanoidTrigger = r === 6 && c === 3;
        const el = mainTableElements.find(e => e.period === r && e.group === c);

        if (el) {
          const isMatch = matchesSearchAndFilters(el);
          grid.push(
            <div key={`el-${el.atomicNumber}`} className={`transition-all duration-300 ${isSearchActive && !isMatch ? 'opacity-10 grayscale scale-90 pointer-events-none' : 'opacity-100 element-match'}`}>
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
      <div className="w-full max-w-[1500px] grid grid-cols-1 md:grid-cols-3 items-center mb-6 md:mb-12 gap-6 relative z-[100]">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] leading-none uppercase">
            Periodensystem
          </h1>
          <p className="text-indigo-400/60 font-mono text-[10px] tracking-[0.4em] mt-2 uppercase hidden md:block">
            der Elemente / Design Edition
          </p>
        </div>
        <div className="flex justify-center order-first md:order-none">
          <div 
            ref={searchContainerRef}
            className={`relative flex items-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isSearchOpen ? 'w-full md:w-[400px] opacity-100 scale-100 translate-y-0' : 'w-0 opacity-0 scale-95 -translate-y-2 pointer-events-none overflow-visible'}`}
          >
            <input 
              ref={searchInputRef} 
              type="text" 
              placeholder="Suchen..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full h-11 md:h-14 pl-12 pr-14 bg-slate-900/60 border border-white/10 rounded-2xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600 backdrop-blur-xl shadow-2xl" 
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 text-indigo-500/60">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            
            <button 
              onClick={(e) => { e.stopPropagation(); setIsFilterMenuOpen(!isFilterMenuOpen); }}
              className={`absolute right-4 p-2 rounded-lg transition-all ${isFilterMenuOpen || isFilterActive ? 'text-indigo-400 bg-indigo-500/20' : 'text-slate-500 hover:text-indigo-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              {isFilterActive && <div className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>}
            </button>

            {isFilterMenuOpen && (
              <div 
                ref={filterMenuRef}
                className="absolute top-full mt-4 right-0 w-80 p-6 bg-slate-900/95 border border-white/10 backdrop-blur-3xl rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] z-[200] animate-in fade-in slide-in-from-top-6 duration-300 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-900 ring-1 ring-white/20"
              >
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/80">Klassifizierung</h5>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {Object.values(ElementClassification).map(cl => (
                        <button
                          key={cl}
                          onClick={() => toggleClassificationFilter(cl)}
                          className={`px-4 py-2.5 rounded-2xl text-[11px] font-bold uppercase transition-all border text-left flex items-center justify-between ${filters.classifications.includes(cl) ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'bg-slate-800/50 border-white/5 text-slate-400 hover:border-indigo-500/30'}`}
                        >
                          {cl}
                          {filters.classifications.includes(cl) && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/80 mb-4">Zustand</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {(['solid', 'liquid', 'gas', 'unknown'] as State[]).map(s => (
                        <button
                          key={s}
                          onClick={() => toggleStateFilter(s)}
                          className={`px-3 py-2.5 rounded-2xl text-[10px] font-bold uppercase transition-all border ${filters.states.includes(s) ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'bg-slate-800/50 border-white/5 text-slate-400 hover:border-indigo-500/30'}`}
                        >
                          {s === 'solid' ? 'fest' : s === 'liquid' ? 'flüssig' : s === 'gas' ? 'gas' : 'unbekannt'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/80 mb-4">Schale (Kategorie)</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.values(ElementCategory).map(cat => (
                        <button
                          key={cat}
                          onClick={() => toggleCategoryFilter(cat)}
                          className={`px-3 py-2.5 rounded-2xl text-[10px] font-bold uppercase transition-all border ${filters.categories.includes(cat) ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'bg-slate-800/50 border-white/5 text-slate-400 hover:border-indigo-500/30'}`}
                        >
                          {cat.split('-')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {isFilterActive && (
                    <button 
                      onClick={() => setFilters({ states: [], categories: [], classifications: [] })}
                      className="w-full py-4 text-[10px] font-black uppercase tracking-[0.4em] text-red-400 hover:text-red-300 transition-all border-t border-white/10 mt-2 flex items-center justify-center gap-2 group"
                    >
                      <span className="opacity-50 group-hover:opacity-100 transition-opacity">✕</span>
                      Filter zurücksetzen
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-end gap-3 pr-4 md:pr-10">
          <button 
            onClick={() => { setIsSearchOpen(!isSearchOpen); if (isSearchOpen) { setSearchQuery(''); setFilters({ states: [], categories: [], classifications: [] }); setIsFilterMenuOpen(false); } }} 
            className={`control-btn w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center border transition-all active:scale-90 shadow-2xl ${isSearchOpen ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900/80 border-white/5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          
          <button 
            onClick={toggleTempUnit}
            className="control-btn w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-slate-900/80 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-800 transition-all font-mono font-bold text-slate-400 hover:text-indigo-400 shadow-2xl active:scale-90"
          >
            {getUnitLabel(tempUnit)}
          </button>

          <button onClick={() => setRounded(!rounded)} className="control-btn w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-slate-900/80 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-800 transition-all text-xl md:text-2xl text-slate-400 hover:text-indigo-400 shadow-2xl active:scale-90">{rounded ? '≈' : '='}</button>
        </div>
      </div>

      <div className="w-full max-w-[1500px] overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent relative z-10">
        {hasNoResults && (
          <div className="absolute inset-0 flex items-center justify-center z-[50] animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-slate-900/90 backdrop-blur-xl px-12 py-8 rounded-[3rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
              <span className="text-xl md:text-2xl font-black text-indigo-400 uppercase tracking-[0.3em]">
                Element nicht gefunden.
              </span>
            </div>
          </div>
        )}
        <div className={`min-w-[1100px] lg:min-w-full ptable-grid border border-black/40 shadow-2xl bg-black/10 transition-all duration-500 ${hasNoResults ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100'}`}>
          {renderTable()}
        </div>
      </div>

      <div className="w-full max-w-[1500px] flex flex-col gap-8 relative z-0">
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
                <div key={`lan-${el.atomicNumber}`} className={`transition-all duration-300 ${isSearchActive && !matchesSearchAndFilters(el) ? 'opacity-10 grayscale scale-90 pointer-events-none' : 'opacity-100 element-match'}`}>
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
                <div key={`act-${el.atomicNumber}`} className={`transition-all duration-300 ${isSearchActive && !matchesSearchAndFilters(el) ? 'opacity-10 grayscale scale-90 pointer-events-none' : 'opacity-100 element-match'}`}>
                  <ElementTile element={el} rounded={rounded} onClick={setSelectedElement} />
                </div>
              ))}
            </div></div>
          </div>
        )}
      </div>

      <div className="w-full max-w-[1500px] mt-16 p-8 rounded-[2.5rem] bg-slate-900/30 border border-white/5 backdrop-blur-2xl relative z-0">
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
      <ElementModal 
        element={selectedElement} 
        onClose={() => setSelectedElement(null)} 
        tempUnit={tempUnit}
        onToggleUnit={toggleTempUnit}
      />
      <style>{`
        .ptable-grid { 
          display: grid; 
          grid-template-columns: 40px repeat(18, minmax(0, 1fr)); 
          gap: 1px; 
        }
        .grid-cols-14 { display: grid; grid-template-columns: repeat(14, minmax(0, 1fr)); gap: 1px; }
        ::-webkit-scrollbar { height: 3px; }
        ::-webkit-scrollbar-thumb { background: #312e81; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;
