import { create } from 'zustand';
import type { Action, GameState } from '../domain/numberMatch';
import {
  createGame,
  gameReducer,
  loadGame,
  saveGame,
} from '../domain/numberMatch';

type Store = {
  state: GameState;
  dispatch: (action: Action) => void;
  reset: () => void;
  hydrate: () => void;
};

export const useGameStore = create<Store>((set) => ({
  state: createGame(8, 8),

  dispatch: (action) => {
    set((cur) => {
      const next = gameReducer(cur.state, action);
      // persist after every transition (simple + robust)
      saveGame(next);
      return { state: next };
    });
  },

  reset: () => {
    const next = createGame(8, 8);
    saveGame(next);
    set({ state: next });
  },

  hydrate: () => {
    const saved = loadGame();
    if (saved) set({ state: saved });
  },
}));
