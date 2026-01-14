
export type State = 'solid' | 'liquid' | 'gas' | 'unknown';

export enum ElementCategory {
  NonMetal = 'NonMetal',
  NobleGas = 'NobleGas',
  AlkaliMetal = 'AlkaliMetal',
  AlkalineEarth = 'AlkalineEarth',
  Metalloid = 'Metalloid',
  Halogen = 'Halogen',
  PostTransitionMetal = 'PostTransitionMetal',
  TransitionMetal = 'TransitionMetal',
  Lanthanide = 'Lanthanide',
  Actinide = 'Actinide'
}

export interface ElementData {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: ElementCategory;
  state: State;
  meltingPoint: number | null; // Kelvin
  boilingPoint: number | null; // Kelvin
  density: number | null; // g/cm³ or g/L for gases
  period: number;
  group: number;
  summary: string;
}
