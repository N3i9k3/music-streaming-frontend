import { createClient } from "@supabase/supabase-js";
import axios from "axios";

/* =======================
   Backend API Setup
   ======================= */
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

/* =======================
   Supabase Client Setup
   ======================= */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* =======================
   MOCK DATA (TEMP)
   ======================= */
const MOCK_TRACKS = [
  {
    id: "1",
    title: "Believer",
    artist: "Imagine Dragons",
    audio_url:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover_url: "https://i.imgur.com/8Km9tLL.jpg",
    category_id: "music",
  },
  {
    id: "2",
    title: "Shape of You",
    artist: "Ed Sheeran",
    audio_url:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover_url: "https://i.imgur.com/zYxDCQT.jpg",
    category_id: "music",
  },
  {
    id: "3",
    title: "Podcast Episode 1",
    artist: "Tech Talks",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover_url: "https://i.imgur.com/ZXBtVw7.jpg",
    category_id: "podcast",
  },
];

const MOCK_CATEGORIES = [
  { id: "music", name: "Music" },
  { id: "podcast", name: "Podcast" },
];

const MOCK_PLAYLISTS = [
  {
    id: "1",
    name: "My Favorites",
  },
];

/* =======================
   API FUNCTIONS
   ======================= */

// Fetch tracks
export const getTracks = async () => {
  return MOCK_TRACKS;
};

// Fetch categories
export const getCategories = async () => {
  return MOCK_CATEGORIES;
};

// Fetch playlists
export const getPlaylists = async () => {
  return MOCK_PLAYLISTS;
};

// Upload track
export const uploadTrack = async (file, metadata) => {
  try {
    const { error } = await supabase.storage
      .from("tracks")
      .upload(file.name, file);

    if (error) throw error;

    const { error: metaError } = await supabase
      .from("tracks")
      .insert([metadata]);

    if (metaError) throw metaError;

    return true;
  } catch (err) {
    console.error("uploadTrack failed:", err.message || err);
    throw new Error("Failed to upload track");
  }
};

/* =======================
   AUTH APIs
   ======================= */

// Login (Admin)
export const loginUser = async (credentials) => {
  try {
    const res = await api.post("/api/admin/login", credentials);
    return res.data;
  } catch (err) {
    console.error("Login failed:", err);
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

