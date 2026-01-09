import { useEffect, useState } from "react";
import MusicCard from "../components/Music/MusicCard";
import CategoryFilter from "../components/Music/CategoryFilter";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { usePlayer } from "../context/PlayerContext";
import { getTracks, getCategories, getPlaylists } from "../services/api"; // centralized API
import ErrorFallback from "../components/ErrorFallback";

const Home = () => {
  const [tracks, setTracks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔍 Search state
  const [searchResults, setSearchResults] = useState(null);

  const { playTrack } = usePlayer(); // pass to search results

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        // Fetch all data in parallel using centralized APIs
        const [tracksData, categoriesData, playlistsData] = await Promise.all([
          getTracks(),
          getCategories(),
          getPlaylists(),
        ]);

        setTracks(tracksData || []);
        setCategories(categoriesData || []);
        setPlaylists(playlistsData || []);
      } catch (err) {
        console.error("Failed to fetch Home data:", err.message || err);
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Filter tracks by selected category safely
  const filteredTracks = Array.isArray(tracks)
    ? selectedCategory
      ? tracks.filter((t) => t.category_id === selectedCategory)
      : tracks
    : [];

  if (loading) return <Loader />;
  if (error) return <ErrorFallback message={error} />;

  return (
    <div className="p-4 md:p-6 pb-32 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Browse Music</h1>

      {/* 🔍 SEARCH BAR */}
      <div className="mb-6">
        <SearchBar onResults={setSearchResults} />
        <SearchResults results={searchResults} onPlayTrack={playTrack} />
      </div>

      {/* 🧠 Hide Browse UI when searching */}
      {!searchResults && (
        <>
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          {/* Tracks Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {filteredTracks.length === 0 ? (
              <p className="text-gray-400 text-center col-span-full mt-10">
                No music available
              </p>
            ) : (
              filteredTracks.map((track) => (
                <MusicCard key={track.id} track={track} playlists={playlists} />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
