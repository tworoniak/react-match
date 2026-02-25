import { useEffect, useMemo } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { movesLeft } from '../../domain/numberMatch';
import Board from './components/Board/Board';
import HUD from './components/HUD/HUD';

export default function NumberMatchPage() {
  const { state, dispatch, hydrate, reset } = useGameStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const remainingMoves = useMemo(() => movesLeft(state), [state]);

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: 16 }}>
      <HUD
        score={state.score}
        movesLeft={remainingMoves}
        onNewGame={reset}
        onDealMore={() => dispatch({ type: 'DEAL_MORE' })}
      />

      <Board
        grid={state.grid}
        selected={state.selected}
        onSelect={(pos) => dispatch({ type: 'SELECT', payload: { pos } })}
      />
    </div>
  );
}
