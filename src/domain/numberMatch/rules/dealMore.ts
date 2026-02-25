import type { Cell } from '../types';

export function dealMore(grid: Cell[][]): Cell[][] {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;

  const remaining: number[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = grid[r][c];
      if (v != null) remaining.push(v);
    }
  }

  // Pack back into same shape, leaving trailing nulls.
  const packed: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => null),
  );
  let k = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (k < remaining.length) packed[r][c] = remaining[k++];
    }
  }

  // Append one more row copied from remaining (common variant),
  // or generate new numbers if you prefer.
  const nextRow: Cell[] = Array.from({ length: cols }, () => null);
  for (let c = 0; c < cols; c++) nextRow[c] = remaining[c] ?? null;

  return [...packed, nextRow];
}
