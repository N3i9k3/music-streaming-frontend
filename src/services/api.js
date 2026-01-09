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
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

/* =======================
   TRACKS & CATEGORIES
   ======================= */

// Fetch all tracks
export const getTracks = async () => {
  try {
    const res = await api.get("/tracks");
    return res.data;
  } catch (err) {
    console.error("getTracks error:", err);
    return [];
  }
};

// Fetch categories
export const getCategories = async () => {
  try {
    const res = await api.get("/categories");
    return res.data;
  } catch (err) {
    console.error("getCategories error:", err);
    return [];
  }
};

/* =======================
   PODCAST APIs
   ======================= */

export const getAllPodcasts = async () => {
  try {
    const res = await api.get("/podcasts");
    return res.data;
  } catch (err) {
    console.error("getAllPodcasts error:", err);
    return [];
  }
};

export const getPodcastDetail = async (id) => {
  try {
    const res = await api.get(`/podcasts/${id}`);
    return res.data;
  } catch (err) {
    console.error("getPodcastDetail error:", err);
    return null;
  }
};

/* =======================
   PLAYLIST APIs
   ======================= */

export const getPlaylists = async () => {
  try {
    const res = await api.get("/playlists");
    return res.data;
  } catch (err) {
    console.error("getPlaylists error:", err);
    return [];
  }
};

export const createNewPlaylist = async (name) => {
  try {
    const res = await api.post("/playlists", { name });
    return res.data;
  } catch (err) {
    console.error("createNewPlaylist error:", err);
    throw new Error("Failed to create playlist");
  }
};

export const getPlaylistDetail = async (playlistId) => {
  try {
    const res = await api.get(`/playlists/${playlistId}`);
    return res.data;
  } catch (err) {
    console.error("getPlaylistDetail error:", err);
    return null;
  }
};

export const addToPlaylist = async (playlistId, trackId) => {
  try {
    const res = await api.post(`/playlists/${playlistId}/add`, { trackId });
    return res.data;
  } catch (err) {
    console.error("addToPlaylist error:", err);
    throw new Error("Failed to add track");
  }
};

export const removeTrackFromPlaylist = async (playlistId, trackId) => {
  try {
    const res = await api.post(`/playlists/${playlistId}/remove`, { trackId });
    return res.data;
  } catch (err) {
    console.error("removeTrackFromPlaylist error:", err);
    throw new Error("Failed to remove track");
  }
};

/* =======================
   ADMIN UPLOAD
   ======================= */

export const uploadTrack = async (file, metadata) => {
  try {
    // Upload audio file to Supabase
    const { data, error } = await supabase.storage
      .from("tracks")
      .upload(`audio/${Date.now()}_${file.name}`, file);

    if (error) throw error;

    // Public URL
    const publicUrl = supabase.storage
      .from("tracks")
      .getPublicUrl(data.path).data.publicUrl;

    // Save track metadata in backend
    const res = await api.post("/tracks/upload", {
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

export const loginUser = async (credentials) => {
  try {
    const res = await api.post("/api/admin/login", credentials);
    return res.data;
  } catch (err) {
    console.error("Login failed:", err);
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

