import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components"; // reusable component
import Loader from "../components/Loader";
import ErrorFallback from "../components/ErrorFallback";
import { getPlaylistDetail, removeTrackFromPlaylist } from "../services/api"; // centralized API

const PlaylistDetail = () => {
  const { id } = useParams(); // Playlist ID from URL
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch playlist details on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getPlaylistDetail(id); // centralized API
        setPlaylist(data);
      } catch (err) {
        console.error("Failed to fetch playlist:", err.message || err);
        setError(err.message || "Failed to load playlist");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Remove track from playlist
  const removeTrack = async (trackId) => {
    if (!playlist) return;

    try {
      await removeTrackFromPlaylist(id, trackId); // centralized API
      setPlaylist({
        ...playlist,
        playlist_tracks: playlist.playlist_tracks.filter(
          (t) => t.track_id !== trackId
        ),
      }); // optimistic UI update
    } catch (err) {
      console.error("Failed to remove track:", err.message || err);
      setError(err.message || "Failed to remove track");
    }
  };

  // Loader or Error state
  if (loading) return <Loader />;
  if (error) return <ErrorFallback message={error} />;
  if (!playlist) return <ErrorFallback message="Playlist not found" />;

  return (
    <div className="playlist-detail-page p-4">
      <h2 className="text-xl font-bold mb-4">{playlist.name}</h2>

      {playlist.playlist_tracks.length === 0 ? (
        <p>No tracks in this playlist yet</p>
      ) : (
        <ul className="space-y-2">
          {playlist.playlist_tracks.map((pt) => (
            <li
              key={pt.track_id}
              className="flex justify-between items-center p-2 border rounded"
            >
              <span>{pt.tracks.title}</span>
              <Button
                className="bg-red-500 text-white px-3 py-1"
                onClick={() => removeTrack(pt.track_id)}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaylistDetail;
