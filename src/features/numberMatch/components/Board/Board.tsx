import CellView from './Cell';
import styles from './Board.module.scss';
import type { Cell, Pos } from '../../../../domain/numberMatch/types';

type Props = {
  grid: Cell[][];
  selected: Pos | null;
  onSelect: (pos: Pos) => void;
};

export default function Board({ grid, selected, onSelect }: Props) {
  const cols = grid[0]?.length ?? 0;

  return (
    <div
      className={styles.board}
      role='grid'
      aria-label='Number Match board'
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {grid.map((row, r) =>
        row.map((value, c) => {
          const isSelected = !!selected && selected.r === r && selected.c === c;

          return (
            <CellView
              key={`${r}-${c}`}
              value={value}
              isSelected={isSelected}
              onClick={() => onSelect({ r, c })}
              ariaLabel={value == null ? 'Empty' : `Number ${value}`}
            />
          );
        }),
      )}
    </div>
  );
}
