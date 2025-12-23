import { useState } from "react";
import styles from "./SearchBar.module.css";

interface Props {
  onSearch: (term: string) => void;
}

export function SearchBar({ onSearch }: Props) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder="Busca (ex: facebook/react)..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type="submit" className={styles.button}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
}
