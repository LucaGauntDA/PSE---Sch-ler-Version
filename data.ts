
import { ElementData, ElementCategory } from './types';

export const ELEMENTS: ElementData[] = [
  // K-Schale (Pink): H, He
  { atomicNumber: 1, symbol: 'H', name: 'Wasserstoff', atomicMass: 1.008, category: ElementCategory.K, state: 'gas', meltingPoint: 14.01, boilingPoint: 20.28, density: 0.00008988, period: 1, group: 1, summary: 'Das häufigste Element im Universum.' },
  { atomicNumber: 2, symbol: 'He', name: 'Helium', atomicMass: 4.0026, category: ElementCategory.K, state: 'gas', meltingPoint: 0.95, boilingPoint: 4.22, density: 0.0001785, period: 1, group: 18, summary: 'Ein inertes Edelgas.' },

  // L-Schale (Orange): Li, Be, B, C, N, O, F, Ne
  { atomicNumber: 3, symbol: 'Li', name: 'Lithium', atomicMass: 6.94, category: ElementCategory.L, state: 'solid', meltingPoint: 453.65, boilingPoint: 1603, density: 0.534, period: 2, group: 1, summary: 'Leichtestes Metall.' },
  { atomicNumber: 4, symbol: 'Be', name: 'Beryllium', atomicMass: 9.0122, category: ElementCategory.L, state: 'solid', meltingPoint: 1560, boilingPoint: 2742, density: 1.85, period: 2, group: 2, summary: 'Stahlgraues Erdalkalimetall.' },
  { atomicNumber: 5, symbol: 'B', name: 'Bor', atomicMass: 10.81, category: ElementCategory.L, state: 'solid', meltingPoint: 2349, boilingPoint: 4200, density: 2.34, period: 2, group: 13, summary: 'Metalloides Element.' },
  { atomicNumber: 6, symbol: 'C', name: 'Kohlenstoff', atomicMass: 12.011, category: ElementCategory.L, state: 'solid', meltingPoint: 3823, boilingPoint: 4098, density: 2.267, period: 2, group: 14, summary: 'Basis allen Lebens.' },
  { atomicNumber: 7, symbol: 'N', name: 'Stickstoff', atomicMass: 14.007, category: ElementCategory.L, state: 'gas', meltingPoint: 63.15, boilingPoint: 77.36, density: 0.0012506, period: 2, group: 15, summary: '78% der Atmosphäre.' },
  { atomicNumber: 8, symbol: 'O', name: 'Sauerstoff', atomicMass: 15.999, category: ElementCategory.L, state: 'gas', meltingPoint: 54.36, boilingPoint: 90.20, density: 0.001429, period: 2, group: 16, summary: 'Lebenswichtiges Gas.' },
  { atomicNumber: 9, symbol: 'F', name: 'Fluor', atomicMass: 18.998, category: ElementCategory.L, state: 'gas', meltingPoint: 53.48, boilingPoint: 85.03, density: 0.001696, period: 2, group: 17, summary: 'Sehr reaktionsfreudig.' },
  { atomicNumber: 10, symbol: 'Ne', name: 'Neon', atomicMass: 20.180, category: ElementCategory.L, state: 'gas', meltingPoint: 24.56, boilingPoint: 27.07, density: 0.0008999, period: 2, group: 18, summary: 'Bekannt für rotes Leuchten.' },

  // M-Schale (Gelb): Na, Mg, Sc-Zn, Al-Ar
  ...[
    {n: 11, s: 'Na', m: 'Natrium', g: 1}, {n: 12, s: 'Mg', m: 'Magnesium', g: 2},
    {n: 21, s: 'Sc', m: 'Scandium', g: 3}, {n: 22, s: 'Ti', m: 'Titan', g: 4},
    {n: 23, s: 'V', m: 'Vanadium', g: 5}, {n: 24, s: 'Cr', m: 'Chrom', g: 6},
    {n: 25, s: 'Mn', m: 'Mangan', g: 7}, {n: 26, s: 'Fe', m: 'Eisen', g: 8},
    {n: 27, s: 'Co', m: 'Cobalt', g: 9}, {n: 28, s: 'Ni', m: 'Nickel', g: 10},
    {n: 29, s: 'Cu', m: 'Kupfer', g: 11}, {n: 30, s: 'Zn', m: 'Zink', g: 12},
    {n: 13, s: 'Al', m: 'Aluminium', g: 13}, {n: 14, s: 'Si', m: 'Silizium', g: 14},
    {n: 15, s: 'P', m: 'Phosphor', g: 15}, {n: 16, s: 'S', m: 'Schwefel', g: 16},
    {n: 17, s: 'Cl', m: 'Chlor', g: 17}, {n: 18, s: 'Ar', m: 'Argon', g: 18}
  ].map(e => ({
    atomicNumber: e.n, symbol: e.s, name: e.m, atomicMass: 30, category: ElementCategory.M,
    state: (e.n === 17 || e.n === 18 ? 'gas' : 'solid') as any, period: (e.n > 20 ? 4 : 3), group: e.g, summary: 'Element der M-Schale.',
    meltingPoint: 1000, boilingPoint: 2000, density: 3
  })),

  // N-Schale (Türkis): K, Ca, Y-Cd, Ga-Kr, Lanthanoide
  ...[
    {n: 19, s: 'K', g: 1}, {n: 20, s: 'Ca', g: 2}, {n: 39, s: 'Y', g: 3}, {n: 40, s: 'Zr', g: 4},
    {n: 41, s: 'Nb', g: 5}, {n: 42, s: 'Mo', g: 6}, {n: 43, s: 'Tc', g: 7}, {n: 44, s: 'Ru', g: 8},
    {n: 45, s: 'Rh', g: 9}, {n: 46, s: 'Pd', g: 10}, {n: 47, s: 'Ag', g: 11}, {n: 48, s: 'Cd', g: 12},
    {n: 31, s: 'Ga', g: 13}, {n: 32, s: 'Ge', g: 14}, {n: 33, s: 'As', g: 15}, {n: 34, s: 'Se', g: 16},
    {n: 35, s: 'Br', g: 17}, {n: 36, s: 'Kr', g: 18}, {n: 57, s: 'La', g: 3}
  ].map(e => ({
    atomicNumber: e.n, symbol: e.s, name: e.s, atomicMass: 80, category: ElementCategory.N,
    state: (e.n === 36 ? 'gas' : e.n === 35 ? 'liquid' : 'solid') as any, period: (e.n === 19 || e.n === 20 || e.n > 30 && e.n < 39 ? 4 : 5), group: e.g, summary: 'Element der N-Schale.',
    meltingPoint: 1000, boilingPoint: 2000, density: 5
  })),
  // Lanthanoide (58-71)
  ...Array.from({length: 14}, (_, i) => 58 + i).map(n => ({
    atomicNumber: n, symbol: 'Ln', name: 'Lanthanoid', atomicMass: 150, category: ElementCategory.N,
    state: 'solid' as const, period: 6, group: 3, summary: 'Seltene Erde.', meltingPoint: 1000, boilingPoint: 3000, density: 7
  })),

  // O-Schale (Lila): Rb, Sr, In-Xe, Hf-Hg, Actinoide
  ...[
    {n: 37, s: 'Rb', g: 1}, {n: 38, s: 'Sr', g: 2}, {n: 72, s: 'Hf', g: 4}, {n: 73, s: 'Ta', g: 5},
    {n: 74, s: 'W', g: 6}, {n: 75, s: 'Re', g: 7}, {n: 76, s: 'Os', g: 8}, {n: 77, s: 'Ir', g: 9},
    {n: 78, s: 'Pt', g: 10}, {n: 79, s: 'Au', g: 11}, {n: 80, s: 'Hg', g: 12}, {n: 49, s: 'In', g: 13},
    {n: 50, s: 'Sn', g: 14}, {n: 51, s: 'Sb', g: 15}, {n: 52, s: 'Te', g: 16}, {n: 53, s: 'I', g: 17},
    {n: 54, s: 'Xe', g: 18}, {n: 89, s: 'Ac', g: 3}
  ].map(e => ({
    atomicNumber: e.n, symbol: e.s, name: e.s, atomicMass: 180, category: ElementCategory.O,
    state: (e.n === 54 ? 'gas' : e.n === 80 ? 'liquid' : 'solid') as any, period: (e.n < 55 ? 5 : 6), group: e.g, summary: 'Element der O-Schale.',
    meltingPoint: 1000, boilingPoint: 2000, density: 12
  })),
  // Actinoide (90-103)
  ...Array.from({length: 14}, (_, i) => 90 + i).map(n => ({
    atomicNumber: n, symbol: 'An', name: 'Actinoid', atomicMass: 240, category: ElementCategory.O,
    state: 'solid' as const, period: 7, group: 3, summary: 'Radioaktives Element.', meltingPoint: 1000, boilingPoint: 3000, density: 15
  })),

  // P-Schale (Grün): Cs, Ba, Tl-Rn, Rf-Cn
  ...[
    {n: 55, s: 'Cs', g: 1}, {n: 56, s: 'Ba', g: 2}, {n: 104, s: 'Rf', g: 4}, {n: 105, s: 'Db', g: 5},
    {n: 106, s: 'Sg', g: 6}, {n: 107, s: 'Bh', g: 7}, {n: 108, s: 'Hs', g: 8}, {n: 109, s: 'Mt', g: 9},
    {n: 110, s: 'Ds', g: 10}, {n: 111, s: 'Rg', g: 11}, {n: 112, s: 'Cn', g: 12}, {n: 81, s: 'Tl', g: 13},
    {n: 82, s: 'Pb', g: 14}, {n: 83, s: 'Bi', g: 15}, {n: 84, s: 'Po', g: 16}, {n: 85, s: 'At', g: 17},
    {n: 86, s: 'Rn', g: 18}
  ].map(e => ({
    atomicNumber: e.n, symbol: e.s, name: e.s, atomicMass: 280, category: ElementCategory.P,
    state: (e.n === 86 ? 'gas' : 'solid') as any, period: (e.n < 100 ? 6 : 7), group: e.g, summary: 'Element der P-Schale.',
    meltingPoint: 1000, boilingPoint: 2000, density: 10
  })),

  // Q-Schale (Rot): Fr, Ra, Nh-Og
  ...[
    {n: 87, s: 'Fr', g: 1}, {n: 88, s: 'Ra', g: 2}, {n: 113, s: 'Nh', g: 13}, {n: 114, s: 'Fl', g: 14},
    {n: 115, s: 'Mc', g: 15}, {n: 116, s: 'Lv', g: 16}, {n: 117, s: 'Ts', g: 17}, {n: 118, s: 'Og', g: 18}
  ].map(e => ({
    atomicNumber: e.n, symbol: e.s, name: e.s, atomicMass: 294, category: ElementCategory.Q,
    state: 'unknown' as const, period: 7, group: e.g, summary: 'Element der Q-Schale.',
    meltingPoint: null, boilingPoint: null, density: null
  }))
];

export const CATEGORY_COLORS: Record<ElementCategory, string> = {
  [ElementCategory.K]: 'bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.6)]',
  [ElementCategory.L]: 'bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)]',
  [ElementCategory.M]: 'bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)]',
  [ElementCategory.N]: 'bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]',
  [ElementCategory.O]: 'bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]',
  [ElementCategory.P]: 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)]',
  [ElementCategory.Q]: 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]'
};
