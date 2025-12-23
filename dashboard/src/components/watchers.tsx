import styles from "./Card.module.css";
import eyeIcon from "../assets/eye.png";

interface Props {
  count: number;
}

export function Watchers({ count }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>
        <span>Total de watchers</span>
        <img src={eyeIcon} alt="Ícone de olho" className={styles.icon} />
      </div>
      <span className={styles.value}>{count}</span>
    </div>
  );
}
