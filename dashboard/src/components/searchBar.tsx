import { useState } from "react";

interface Props {
  onSearch: (term: string) => void;
}

export function SearchBar({ onSearch }: Props) {
  const [term, setTerm] = useState('');

  return (
    <div>
      <label>Buscar Repositório: </label>
      <input 
        type="text" 
        value={term} 
        onChange={(e) => setTerm(e.target.value)} 
        placeholder="Digite o tema..."
      />
      <button onClick={() => onSearch(term)}>Pesquisar</button>
    </div>
  );
}