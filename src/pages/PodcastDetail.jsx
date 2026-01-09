import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import Loader from "../components/Loader";
import ErrorFallback from "../components/ErrorFallback";
import { getPodcastDetail } from "../services/api"; // centralized API
import { Card } from "../components"; // reusable Card for episodes

const PodcastDetail = () => {
  const { id } = useParams();
  const { playTrack } = usePlayer();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getPodcastDetail(id); // centralized API call
        setPodcast(data);
      } catch (err) {
        console.error("Failed to fetch podcast:", err.message || err);
        setError(err.message || "Failed to load podcast");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorFallback message={error} />;
  if (!podcast) return <ErrorFallback message="Podcast not found" />;

  return (
    <div className="p-4 md:p-6 pb-32 text-white">
      <div className="flex gap-6 mb-6">
        <img
          src={podcast.cover_url}
          className="w-40 h-40 object-cover rounded"
          alt={podcast.title}
        />
        <div>
          <h1 className="text-3xl font-bold">{podcast.title}</h1>
          <p className="text-gray-400 mt-2">{podcast.description}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Episodes</h2>

      {podcast.episodes.length === 0 ? (
        <p className="text-gray-400">No episodes available</p>
      ) : (
        <div className="space-y-3">
          {podcast.episodes.map((ep) => (
            <Card
              key={ep.id}
              className="cursor-pointer hover:bg-gray-700 transition p-3"
              onClick={() =>
                playTrack({
                  title: ep.title,
                  artist: podcast.title,
                  audio_url: ep.audio_url,
                  cover_url: podcast.cover_url,
                })
              }
            >
              🎧 {ep.title}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PodcastDetail;
