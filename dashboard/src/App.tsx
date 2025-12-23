import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { RepositoryName } from "./components/RepositoryName";
import { Stars } from "./components/Stars";
import { Forks } from "./components/Forks";
import { Watchers } from "./components/Watchers";
import { GraphicTime } from "./components/GraphicTime";
import { GraphicUsers, type LanguageData } from "./components/GraphicLanguages";
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
  const [languages, setLanguages] = useState<LanguageData[]>([]);

  const handleSearch = async (term: string) => {
    if (!term) return;
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${term}&sort=stars&order=desc`
      );
      const json = await response.json();

      if (json.items && json.items.length > 0) {
        const top10 = json.items.slice(0, 10);
        const firstRepo = top10[0];

        setRepoList(top10);
        setMainRepo(firstRepo);

        const langResponse = await fetch(
          `https://api.github.com/repos/${firstRepo.full_name}/languages`
        );
        const langJson = await langResponse.json();

        const formattedLanguages: LanguageData[] = Object.keys(langJson).map(
          (key) => ({
            name: key,
            value: langJson[key],
          })
        );

        setLanguages(formattedLanguages.slice(0, 5));
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
              <RepositoryName full_name={mainRepo.full_name} />
            </div>

            <div className={styles.statsGrid}>
              <Stars count={mainRepo.stargazers_count} />
              <Forks count={mainRepo.forks_count} />
              <Watchers count={mainRepo.watchers_count} />
            </div>

            <div className={styles.chartsGrid}>
              <GraphicTime repoName={mainRepo.full_name} />
              <GraphicUsers data={languages} />
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
