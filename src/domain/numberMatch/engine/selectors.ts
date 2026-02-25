import type { GameState, Pos } from '../types';
import { isMatch } from '../rules/match';
import { isConnectable } from '../rules/connect';

export function movesLeft(state: GameState) {
  const { grid } = state;
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  let moves = 0;

  const positions: Pos[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] != null) positions.push({ r, c });

  for (let i = 0; i < positions.length; i++) {
    const p1 = positions[i];
    const v1 = grid[p1.r][p1.c]!;
    for (let j = i + 1; j < positions.length; j++) {
      const p2 = positions[j];
      const v2 = grid[p2.r][p2.c]!;
      if (isMatch(v1, v2) && isConnectable(grid, p1, p2)) moves++;
    }
  }

  return moves;
}
