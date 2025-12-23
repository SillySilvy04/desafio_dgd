import styles from './Card.module.css';

export function Stars({ count }: { count: number }) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>Stars ⭐</span>
      <span className={styles.value}>{count}</span>
    </div>
  );
}