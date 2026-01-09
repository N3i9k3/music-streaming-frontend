import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext"; 
import { Input, Button } from "../components"; // reusable components
import Loader from "../components/Loader";
import ErrorFallback from "../components/ErrorFallback";
import { getPlaylists, createNewPlaylist } from "../services/api"; // centralized API

const Playlist = () => {
  const [name, setName] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { currentTrack, currentTime, audioRef } = usePlayer();
  const [showBanner, setShowBanner] = useState(true);

  // Fetch playlists on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getPlaylists(); // centralized API
        setPlaylists(data || []);
      } catch (err) {
        console.error("Failed to fetch playlists:", err.message || err);
        setError(err.message || "Failed to load playlists");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Create new playlist
  const createPlaylist = async () => {
    if (!name.trim()) return;

    setLoading(true);
    setError("");
    try {
      const newPlaylist = await createNewPlaylist({ name }); // centralized API
      setPlaylists([newPlaylist, ...playlists]); // optimistic update
      setName("");
    } catch (err) {
      console.error("Failed to create playlist:", err.message || err);
      setError(err.message || "Failed to create playlist");
    } finally {
      setLoading(false);
    }
  };

  // Loader or Error state
  if (loading) return <Loader />;
  if (error) return <ErrorFallback message={error} />;

  return (
    <div className="playlist-page p-4">
      <h1 className="text-2xl font-bold mb-4">My Playlists</h1>

      {/* 🔹 Resume Banner */}
      {showBanner && currentTrack && currentTime > 0 && (
        <div className="resume-banner bg-yellow-100 p-2 rounded flex items-center justify-between mb-4">
          <span>
            ⏸ Resumed from {Math.floor(currentTime / 60)}:
            {Math.floor(currentTime % 60).toString().padStart(2, "0")}
          </span>
          <Button
            onClick={() => {
              audioRef.current.play();
              setShowBanner(false);
            }}
          >
            ▶ Resume
          </Button>
        </div>
      )}

      {/* Playlist creation */}
      <div className="mb-4 flex gap-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="My Playlist"
          className="flex-1"
          required
        />
        <Button onClick={createPlaylist}>Create</Button>
      </div>

      {/* Playlist list */}
      {playlists.length === 0 ? (
        <p>No playlists yet</p>
      ) : (
        <div className="playlist-list flex flex-col gap-2">
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              to={`/playlists/${playlist.id}`}
              className="p-2 border rounded hover:bg-gray-100"
            >
              {playlist.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlist;
