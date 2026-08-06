import { FaSearch } from "react-icons/fa";
import "./Watchlist.css";

function SearchStock({ search, setSearch }) {
  return (
    <div className="searchBox">
      <FaSearch className="searchIcon" />

      <input
        type="text"
        placeholder="Search stocks (e.g. RELIANCE, TCS)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchStock;
