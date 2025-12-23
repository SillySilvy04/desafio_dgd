import styles from "./Card.module.css";
import forkIcon from "../assets/fork-in-diagonal.png";

interface Props {
  count: number;
}

export function Forks({ count }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>
        <span>Forks</span>
        <img src={forkIcon} alt="Ícone de fork" className={styles.icon} />
      </div>
      <span className={styles.value}>{count}</span>
    </div>
  );
}
