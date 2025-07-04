import React, { useState, useRef } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch, placeholder = "Search posts..." }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Debounce search for dynamic update
  const debounceTimeout = useRef();
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      onSearch(value);
    }, 250);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit} role="search" aria-label="Search blog posts">
      <label htmlFor="search-input" className={styles.label}>
        <span className="sr-only">Search posts</span>
      </label>
      <input
        id="search-input"
        ref={inputRef}
        className={styles.input}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search posts"
        autoComplete="off"
      />
      <button type="submit" className={styles.button} aria-label="Search">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="11" cy="11" r="7" strokeWidth="2" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
