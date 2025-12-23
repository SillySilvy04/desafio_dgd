import styles from "./Card.module.css";
import starIcon from "../assets/star.png";

interface Props {
  count: number;
}

export function Stars({ count }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>
        <span>Estrelas</span>
        <img src={starIcon} alt="Ícone de estrela" className={styles.icon} />
      </div>
      <span className={styles.value}>{count}</span>
    </div>
  );
}
