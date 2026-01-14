
export type State = 'solid' | 'liquid' | 'gas' | 'unknown';

export enum ElementCategory {
  K = 'K-Schale',
  L = 'L-Schale',
  M = 'M-Schale',
  N = 'N-Schale',
  O = 'O-Schale',
  P = 'P-Schale',
  Q = 'Q-Schale'
}

export interface ElementData {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: ElementCategory;
  state: State;
  meltingPoint: number | null;
  boilingPoint: number | null;
  density: number | null;
  period: number;
  group: number;
  summary: string;
}
