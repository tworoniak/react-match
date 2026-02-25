import clsx from 'clsx';
import styles from './Cell.module.scss';

type Props = {
  value: number | null;
  isSelected: boolean;
  onClick: () => void;
  ariaLabel: string;
};

export default function Cell({ value, isSelected, onClick, ariaLabel }: Props) {
  const disabled = value == null;

  return (
    <button
      type='button'
      className={clsx(styles.cell, isSelected && styles.selected)}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={isSelected}
    >
      {value ?? ''}
    </button>
  );
}
