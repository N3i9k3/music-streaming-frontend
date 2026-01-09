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
   API FUNCTIONS
   ======================= */

// 🎵 Fetch all tracks (music + podcasts)
export const getTracks = async () => {
  try {
    const res = await api.get("/api/tracks");
    return res.data;
  } catch (err) {
    console.error("getTracks error:", err);
    return [];
  }
};

// 🎵 Fetch categories
export const getCategories = async () => {
  try {
    const res = await api.get("/api/categories");
    return res.data;
  } catch (err) {
    console.error("getCategories error:", err);
    return [];
  }
};

// 🎙️ Fetch all podcasts
export const getAllPodcasts = async () => {
  try {
    const res = await api.get("/api/podcasts");
    return res.data;
  } catch (err) {
    console.error("getAllPodcasts error:", err);
    return [];
  }
};

// 🎙️ Fetch single podcast by ID
export const getPodcastDetail = async (id) => {
  try {
    const res = await api.get(`/api/podcasts/${id}`);
    return res.data;
  } catch (err) {
    console.error("getPodcastDetail error:", err);
    return null;
  }
};

// 🎵 Fetch playlists
export const getPlaylists = async () => {
  try {
    const res = await api.get("/api/playlists");
    return res.data;
  } catch (err) {
    console.error("getPlaylists error:", err);
    return [];
  }
};

// 🎵 Create playlist
export const createPlaylist = async (name) => {
  try {
    const res = await api.post("/api/playlists", { name });
    return res.data;
  } catch (err) {
    console.error("createPlaylist error:", err);
    throw new Error("Failed to create playlist");
  }
};

// 🎵 Add track to playlist
export const addToPlaylist = async (playlistId, trackId) => {
  try {
    const res = await api.post(`/api/playlists/${playlistId}/add`, {
      trackId,
    });
    return res.data;
  } catch (err) {
    console.error("addToPlaylist error:", err);
    throw new Error("Failed to add track");
  }
};

// ⬆️ Upload track (Admin)
export const uploadTrack = async (file, metadata) => {
  try {
    // Upload audio file to Supabase storage
    const { data, error } = await supabase.storage
      .from("tracks")
      .upload(`audio/${Date.now()}_${file.name}`, file);

    if (error) throw error;

    // Get public URL
    const publicUrl = supabase.storage
      .from("tracks")
      .getPublicUrl(data.path).data.publicUrl;

    // Save metadata + URL in backend database
    const res = await api.post("/api/tracks/upload", {
      ...metadata,
      audio_url: publicUrl,
    });

    return res.data;
  } catch (err) {
    console.error("uploadTrack failed:", err);
    throw new Error("Track upload failed");
  }
};

/* =======================
   AUTH APIs
   ======================= */

// 👤 Admin Login
export const loginUser = async (credentials) => {
  try {
    const res = await api.post("/api/admin/login", credentials);
    return res.data;
  } catch (err) {
    console.error("Login failed:", err);
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

