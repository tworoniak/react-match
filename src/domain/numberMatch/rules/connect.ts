import type { Cell, Pos } from '../types';

function idxOf(pos: Pos, cols: number) {
  return pos.r * cols + pos.c;
}

function atIdx(
  grid: Cell[][],
  idx: number,
  cols: number,
): { r: number; c: number; v: Cell } {
  const r = Math.floor(idx / cols);
  const c = idx % cols;
  return { r, c, v: grid[r]?.[c] ?? null };
}

function clearBetweenRow(grid: Cell[][], r: number, c1: number, c2: number) {
  const [a, b] = c1 < c2 ? [c1, c2] : [c2, c1];
  for (let c = a + 1; c < b; c++) if (grid[r][c] !== null) return false;
  return true;
}

function clearBetweenCol(grid: Cell[][], c: number, r1: number, r2: number) {
  const [a, b] = r1 < r2 ? [r1, r2] : [r2, r1];
  for (let r = a + 1; r < b; r++) if (grid[r][c] !== null) return false;
  return true;
}

/**
 * Wrap/next-line scanning:
 * Treat the grid as a linear array in reading order (row-major).
 * Two positions connect if all cells between their indices are null.
 */
function clearBetweenLinear(grid: Cell[][], p1: Pos, p2: Pos, cols: number) {
  let i1 = idxOf(p1, cols);
  let i2 = idxOf(p2, cols);
  if (i1 === i2) return false;
  if (i1 > i2) [i1, i2] = [i2, i1];

  for (let i = i1 + 1; i < i2; i++) {
    const { v } = atIdx(grid, i, cols);
    if (v !== null) return false;
  }
  return true;
}

function clearBetweenDiag(grid: Cell[][], p1: Pos, p2: Pos) {
  const dr = p2.r - p1.r;
  const dc = p2.c - p1.c;

  // Must be on a diagonal: |dr| === |dc|
  if (Math.abs(dr) !== Math.abs(dc)) return false;

  const stepR = dr > 0 ? 1 : -1;
  const stepC = dc > 0 ? 1 : -1;

  let r = p1.r + stepR;
  let c = p1.c + stepC;

  while (r !== p2.r && c !== p2.c) {
    if (grid[r][c] !== null) return false;
    r += stepR;
    c += stepC;
  }

  return true;
}

function isDiagonalNeighbor(p1: Pos, p2: Pos) {
  return Math.abs(p1.r - p2.r) === 1 && Math.abs(p1.c - p2.c) === 1;
}

export function isConnectable(grid: Cell[][], p1: Pos, p2: Pos) {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  if (!rows || !cols) return false;

  if (p1.r === p2.r && p1.c === p2.c) return false;

  // bounds check
  if (
    p1.r < 0 ||
    p1.r >= rows ||
    p2.r < 0 ||
    p2.r >= rows ||
    p1.c < 0 ||
    p1.c >= cols ||
    p2.c < 0 ||
    p2.c >= cols
  )
    return false;

  // direct row/col
  if (p1.r === p2.r) return clearBetweenRow(grid, p1.r, p1.c, p2.c);
  if (p1.c === p2.c) return clearBetweenCol(grid, p1.c, p1.r, p2.r);

  // ✅ diagonal adjacency OR diagonal line-of-sight through blanks
  if (isDiagonalNeighbor(p1, p2)) return true;
  if (clearBetweenDiag(grid, p1, p2)) return true;

  // wrap / next-line scanning (your rule #2)
  return clearBetweenLinear(grid, p1, p2, cols);
}
