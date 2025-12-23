import { useState } from 'react';
import { SearchBar } from './components/searchBar';
import { RepositoryName } from './components/repositoryName';
import { Stars } from './components/stars';
import { Forks } from './components/forks';
import { Watchers } from './components/watchers';
import { GraphicTime } from './components/graphicTime';
import { GraphicUsers } from './components/graphicUsers';

interface RepoData {
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
}

function App() {
  const [data, setData] = useState<RepoData | null>(null);

  const handleSearch = async (term: string) => {
    if (!term) return;

    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=${term}&sort=stars&order=desc`);
      const json = await response.json();

      if (json.items && json.items.length > 0) {
        setData(json.items[0]);
      }
    } catch (error) {
      console.error("Erro na busca", error);
    }
  };

  return (
    <div>
      <h1>Dashboard GitHub</h1>
      
      <SearchBar onSearch={handleSearch} />

      <hr />

      {data ? (
        <div>
          <RepositoryName name={data.full_name} />
          <Stars count={data.stargazers_count} />
          <Forks count={data.forks_count} />
          <Watchers count={data.watchers_count} />
          
          {/* Gráficos (placeholders por enquanto) */}
          <GraphicTime />
          <GraphicUsers />
        </div>
      ) : (
        <p>Faça uma pesquisa para ver os resultados.</p>
      )}
    </div>
  );
}

export default App;