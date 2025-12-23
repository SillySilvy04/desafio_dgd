import { SearchBar } from "./SearchBar";
import styles from "./Sidebar.module.css";
import starIcon from "../assets/star.png";

interface RepoData {
  id: number;
  full_name: string;
  stargazers_count: number;
}

interface SidebarProps {
  onSearch: (term: string) => void;
  repoList: RepoData[];
}

export function Sidebar({ onSearch, repoList }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.title}>Dash-Git</h1>

      <SearchBar onSearch={onSearch} />

      {repoList.length > 0 && (
        <div>
          <h3 className={styles.listHeader}>Top Resultados</h3>
          <ul>
            {repoList.map((repo, index) => (
              <li key={repo.id} className={styles.listItem}>
                <div className={styles.order}>#{index + 1}</div>

                <div className={styles.repoInfo}>
                  <span className={styles.repoName} title={repo.full_name}>
                    {repo.full_name}
                  </span>
                  <span className={styles.repoStars}>
                    <img
                      src={starIcon}
                      alt="Ícone de estrela"
                      className={styles.icon}
                    />
                    {repo.stargazers_count}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
