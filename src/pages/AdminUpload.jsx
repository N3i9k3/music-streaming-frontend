import React, { useState } from "react";
import { uploadTrack } from "../services/api"; // centralized API
import { Button, Input, Card } from "../components";
import ErrorFallback from "../components/ErrorFallback";

const AdminUpload = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("music");
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!audioFile || !coverFile) {
      setError("Audio and cover image are required.");
      setLoading(false);
      return;
    }

    try {
      // 🔹 Metadata object
      const metadata = { title, artist, category, type };

      // 🔹 Centralized API call
      await uploadTrack(audioFile, coverFile, metadata);

      setMessage("Track uploaded successfully!");
      setTitle("");
      setArtist("");
      setCategory("");
      setType("music");
      setAudioFile(null);
      setCoverFile(null);
    } catch (err) {
      setError(err.message || "Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Render error fallback if error occurs
  if (error) return <ErrorFallback message={error} />;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Admin Upload</h2>

      {message && <p className="text-green-600 mb-2">{message}</p>}

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mb-2"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        >
          <option value="music">Music</option>
          <option value="podcast">Podcast</option>
        </select>
        <Input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files[0])}
          required
          className="mb-2"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverFile(e.target.files[0])}
          required
          className="mb-2"
        />
        {coverFile && (
          <img
            src={URL.createObjectURL(coverFile)}
            alt="cover preview"
            className="mb-2 w-32 h-32 object-cover"
          />
        )}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </form>
    </div>
  );
};

export default AdminUpload;
