export type Cell = number | null;

export type Pos = { r: number; c: number };

export type GameMode = 'classic';

export type GameState = {
  rows: number;
  cols: number;
  grid: Cell[][];
  selected: Pos | null;
  score: number;
  movesMade: number;
  dealt: number; // number of times "deal more" used
  createdAt: number;
  updatedAt: number;
};

export type Action =
  | {
      type: 'NEW_GAME';
      payload?: Partial<{ rows: number; cols: number; seed?: number }>;
    }
  | { type: 'SELECT'; payload: { pos: Pos } }
  | { type: 'DEAL_MORE' }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'LOAD'; payload: GameState };

export type RulesConfig = {
  allowDiagonal: boolean;
  diagonalMode: 'adjacent' | 'line' | 'both';
};
