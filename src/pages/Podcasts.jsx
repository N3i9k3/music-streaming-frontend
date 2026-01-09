import { useEffect, useState } from "react";
import PodcastCard from "../components/Podcast/PodcastCard";
import Loader from "../components/Loader";
import ErrorFallback from "../components/ErrorFallback";
import { getAllPodcasts } from "../services/api"; // centralized API

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getAllPodcasts(); // centralized API call
        setPodcasts(data || []);
      } catch (err) {
        console.error("Failed to fetch podcasts:", err.message || err);
        setError(err.message || "Failed to load podcasts");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorFallback message={error} />;

  return (
    <div className="p-4 md:p-6 pb-32 bg-black min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">Podcasts</h1>

      {podcasts.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">
          No podcasts available
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {podcasts.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Podcasts;
