import React from "react";
import "./SearchBar.css";

// PUBLIC_INTERFACE
function SearchBar({ query, setQuery }) {
  return (
    <div className="searchbar">
      <input
        className="searchbar-input"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search posts, tags, authors..."
        aria-label="Search"
      />
    </div>
  );
}
export default SearchBar;
