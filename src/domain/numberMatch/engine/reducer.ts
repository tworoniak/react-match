import type { Action, GameState } from '../types';
import { createGame } from './createGame';
import { isMatch } from '../rules/match';
import { isConnectable } from '../rules/connect';
import { dealMore } from '../rules/dealMore';

export function gameReducer(state: GameState, action: Action): GameState {
  const now = Date.now();

  switch (action.type) {
    case 'NEW_GAME': {
      const rows = action.payload?.rows ?? 8;
      const cols = action.payload?.cols ?? 8;
      return createGame(rows, cols);
    }

    case 'LOAD':
      return action.payload;

    case 'CLEAR_SELECTION':
      return { ...state, selected: null, updatedAt: now };

    case 'DEAL_MORE': {
      const nextGrid = dealMore(state.grid);
      return {
        ...state,
        grid: nextGrid,
        selected: null,
        dealt: state.dealt + 1,
        updatedAt: now,
      };
    }

    case 'SELECT': {
      const { pos } = action.payload;
      const v = state.grid[pos.r]?.[pos.c];
      if (v == null) return state;

      // first selection
      if (!state.selected) {
        return { ...state, selected: pos, updatedAt: now };
      }

      // selecting same tile toggles off
      if (state.selected.r === pos.r && state.selected.c === pos.c) {
        return { ...state, selected: null, updatedAt: now };
      }

      const aPos = state.selected;
      const a = state.grid[aPos.r][aPos.c];
      const b = v;

      // attempt match
      if (a != null && isMatch(a, b) && isConnectable(state.grid, aPos, pos)) {
        const next = state.grid.map((row) => row.slice());
        next[aPos.r][aPos.c] = null;
        next[pos.r][pos.c] = null;

        return {
          ...state,
          grid: next,
          selected: null,
          score: state.score + 10,
          movesMade: state.movesMade + 1,
          updatedAt: now,
        };
      }

      // otherwise move selection
      return { ...state, selected: pos, updatedAt: now };
    }

    default:
      return state;
  }
}
