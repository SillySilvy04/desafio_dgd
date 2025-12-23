import styles from './Card.module.css';

export function Forks({ count }: { count: number }) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>Forks 🍴</span>
      <span className={styles.value}>{count}</span>
    </div>
  );
}