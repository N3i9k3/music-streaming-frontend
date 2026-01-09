import { createContext, useContext, useEffect, useRef, useState } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Create the audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // Play a track
  const playTrack = (track) => {
    if (!track || !track.audio_url) return;
    const audio = audioRef.current;

    // If same track → resume
    if (currentTrack?.audio_url === track.audio_url) {
      audio.play().then(() => setIsPlaying(true)).catch(console.error);
      return;
    }

    // New track
    setCurrentTrack(track); // ✅ Set before playing
    audio.pause();
    audio.src = track.audio_url;
    audio.currentTime = 0;
    audio.load(); // Ensure metadata is loaded

    audio.play().then(() => setIsPlaying(true)).catch(console.error);
  };

  // Pause track
  const pauseTrack = () => {
    const audio = audioRef.current;
    audio.pause();
    setIsPlaying(false);
  };

  // Seek
  const seek = (time) => {
    const audio = audioRef.current;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        duration,
        currentTime,
        playTrack,
        pauseTrack,
        seek,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
