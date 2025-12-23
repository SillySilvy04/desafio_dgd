import styles from "./RepositoryName.module.css";

interface Props {
  full_name: string | undefined;
}

export function RepositoryName({ full_name }: Props) {
  if (!full_name) {
    return null;
  }

  const [owner, repo] = full_name.split("/");

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <span className={styles.owner}>{owner}</span>
        <span className={styles.separator}>/</span>
        <span className={styles.repo}>{repo}</span>
      </h2>

      <a
        href={`https://github.com/${full_name}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.githubLink}
      >
        Ver no GitHub ↗
      </a>
    </div>
  );
}
