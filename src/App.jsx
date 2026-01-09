import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AudioPlayer from "./components/Player/AudioPlayer";
import { PlayerProvider } from "./context/PlayerContext";

// 🔹 Lazy-loaded pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const Podcasts = lazy(() => import("./pages/Podcasts"));
const PodcastDetail = lazy(() => import("./pages/PodcastDetail"));
const Playlist = lazy(() => import("./pages/Playlist"));
const PlaylistDetail = lazy(() => import("./pages/PlaylistDetail"));
const AdminUpload = lazy(() => import("./pages/AdminUpload"));

// 🔹 Simple fallback loader (use your Loader component if you have one)
const Loader = () => (
  <div className="text-center mt-20 text-gray-400">
    Loading...
  </div>
);

const App = () => {
  return (
    <PlayerProvider>
      <div className="bg-black min-h-screen text-white">
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/podcasts"
              element={
                <ProtectedRoute>
                  <Podcasts />
                </ProtectedRoute>
              }
            />

            <Route
              path="/podcasts/:id"
              element={
                <ProtectedRoute>
                  <PodcastDetail />
                </ProtectedRoute>
              }
            />

            {/* Playlist Routes */}
            <Route
              path="/playlists"
              element={
                <ProtectedRoute>
                  <Playlist />
                </ProtectedRoute>
              }
            />

            <Route
              path="/playlists/:id"
              element={
                <ProtectedRoute>
                  <PlaylistDetail />
                </ProtectedRoute>
              }
            />

            {/* Admin Route */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminUpload />
                </AdminRoute>
              }
            />
          </Routes>
        </Suspense>

        {/* 🎵 Global Audio Player */}
        <AudioPlayer />
      </div>
    </PlayerProvider>
  );
};

export default App;
