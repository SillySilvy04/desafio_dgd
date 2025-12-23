import styles from './Card.module.css';

export function Watchers({ count }: { count: number }) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>Total watchers 👀</span>
      <span className={styles.value}>{count}</span>
    </div>
  );
}