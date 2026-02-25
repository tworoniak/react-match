import type { GameState } from '../types';

const KEY = 'numberMatch.save.v1';

export function saveGame(state: GameState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function loadGame(): GameState | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as GameState;
  } catch {
    return null;
  }
}

export function clearSave() {
  localStorage.removeItem(KEY);
}
