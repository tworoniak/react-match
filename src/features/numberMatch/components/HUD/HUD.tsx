import styles from './HUD.module.scss';

type Props = {
  score: number;
  movesLeft: number;
  onNewGame: () => void;
  onDealMore: () => void;
};

export default function HUD({
  score,
  movesLeft,
  onNewGame,
  onDealMore,
}: Props) {
  const noMoves = movesLeft === 0;

  return (
    <header className={styles.hud}>
      <div className={styles.left}>
        <div className={styles.title}>Number Match</div>
        <div className={styles.meta}>Score: {score}</div>
        <div className={styles.meta}>Moves: {movesLeft}</div>

        {noMoves && (
          <span className={styles.badge} role='status' aria-live='polite'>
            No moves
          </span>
        )}
      </div>

      <div className={styles.actions}>
        <button type='button' className={styles.button} onClick={onDealMore}>
          Deal more
        </button>
        <button type='button' className={styles.button} onClick={onNewGame}>
          New game
        </button>
      </div>
    </header>
  );
}
