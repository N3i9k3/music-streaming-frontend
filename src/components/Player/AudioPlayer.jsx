import { usePlayer } from "../../context/PlayerContext";

const AudioPlayer = () => {
  const { currentTrack, isPlaying, duration, currentTime, playTrack, pauseTrack, seek } = usePlayer();

  if (!currentTrack) return null;

  const togglePlay = () => {
    if (isPlaying) pauseTrack();
    else playTrack(currentTrack);
  };

  const handleSeek = (e) => seek(Number(e.target.value));

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-3 z-50">
      {/* Track Info + Play/Pause */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white truncate">{currentTrack.title}</p>
          <p className="text-gray-400 truncate">{currentTrack.artist}</p>
        </div>

        <button
          onClick={togglePlay}
          className="px-4 py-2 bg-green-500 rounded hover:opacity-80 transition"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>

      {/* Seekbar */}
      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime || 0}
        onChange={handleSeek}
        className="w-full mt-2 accent-green-400 cursor-pointer"
      />
    </div>
  );
};

export default AudioPlayer;
