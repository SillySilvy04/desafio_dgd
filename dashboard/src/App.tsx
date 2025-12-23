import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { RepositoryName } from "./components/repositoryName";
import { Stars } from "./components/stars";
import { Forks } from "./components/forks";
import { Watchers } from "./components/watchers";
import { GraphicTime } from "./components/graphicTime";
import { GraphicUsers } from "./components/graphicUsers";
import styles from "./App.module.css";

interface RepoData {
  id: number;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
}

function App() {
  const [repoList, setRepoList] = useState<RepoData[]>([]);
  const [mainRepo, setMainRepo] = useState<RepoData | null>(null);

  const handleSearch = async (term: string) => {
    if (!term) return;
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${term}&sort=stars&order=desc`
      );
      const json = await response.json();
      if (json.items && json.items.length > 0) {
        const top10 = json.items.slice(0, 10);
        setRepoList(top10);
        setMainRepo(top10[0]);
      }
    } catch (error) {
      console.error("Erro na busca", error);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar onSearch={handleSearch} repoList={repoList} />

      <main className={styles.mainContent}>
        {mainRepo ? (
          <>
            <div className={styles.header}>
              <RepositoryName name={mainRepo.full_name} />
            </div>

            <div className={styles.statsGrid}>
              <Stars count={mainRepo.stargazers_count} />
              <Forks count={mainRepo.forks_count} />
              <Watchers count={mainRepo.watchers_count} />
            </div>

            <div className={styles.chartsGrid}>
              <GraphicTime />
              <GraphicUsers />
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <h2>Pesquise um termo para ver o Dashboard</h2>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
