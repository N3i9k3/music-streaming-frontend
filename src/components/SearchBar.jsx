import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import axios from "axios";

const SearchBar = ({ onResults }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.trim().length < 2) {
        onResults(null);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/search?q=${debouncedQuery}`
        );
        onResults(res.data);
      } catch (err) {
        console.error("Search failed");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <div className="relative w-full">
      <input
        className="w-full p-2 rounded bg-gray-800 text-white"
        placeholder="Search songs or podcasts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <button
          className="absolute right-2 top-2 text-gray-400"
          onClick={() => setQuery("")}
        >
          ❌
        </button>
      )}

      {loading && <p className="text-sm mt-1">Searching...</p>}
    </div>
  );
};

export default SearchBar;
