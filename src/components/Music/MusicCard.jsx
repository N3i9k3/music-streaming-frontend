import { usePlayer } from "../../context/PlayerContext";

const MusicCard = ({ track }) => {
  const { currentTrack, isPlaying, playTrack, pauseTrack } = usePlayer();

  const isCurrent = currentTrack?.audio_url === track.audio_url;

  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (isCurrent && isPlaying) pauseTrack();
    else playTrack(track);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-all">
      <img
        src={track.cover_url || "/covers/default-cover.jpg"}
        alt={track.title}
        className="w-full h-40 object-cover rounded-md"
      />

      <h3 className="font-semibold mt-2 truncate">{track.title}</h3>
      <p className="text-sm text-gray-400 truncate">{track.artist}</p>

      <button
        onClick={handlePlayPause}
        className="mt-2 w-full bg-green-500 text-black rounded py-1 hover:opacity-80"
      >
        {isCurrent && isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default MusicCard;
