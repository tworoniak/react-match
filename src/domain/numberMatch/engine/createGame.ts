import type { Cell, GameState } from '../types';

function rand1to9() {
  return 1 + Math.floor(Math.random() * 9);
}

export function createGrid(rows: number, cols: number): Cell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () =>
      Math.random() < 0.85 ? rand1to9() : null,
    ),
  );
}

export function createGame(rows = 8, cols = 8): GameState {
  const now = Date.now();
  return {
    rows,
    cols,
    grid: createGrid(rows, cols),
    selected: null,
    score: 0,
    movesMade: 0,
    dealt: 0,
    createdAt: now,
    updatedAt: now,
  };
}
