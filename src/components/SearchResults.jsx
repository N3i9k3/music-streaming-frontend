import MusicCard from "./Music/MusicCard";

const SearchResults = ({ results }) => {
  if (!results) return null;
  const { tracks = [], podcasts = [] } = results;

  if (tracks.length === 0 && podcasts.length === 0) {
    return <p className="text-gray-400 mt-4">No results found</p>;
  }

  return (
    <div className="mt-6 space-y-6">
      {/* Tracks */}
      {tracks.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">🎵 Songs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tracks.map((track) => (
              <MusicCard key={track.id} track={track} />
            ))}
          </div>
        </div>
      )}

      {/* Podcasts */}
      {podcasts.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mt-6 mb-2">🎙 Podcasts</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {podcasts.map((podcast) => (
              <div
                key={podcast.id}
                className="bg-zinc-900 p-3 rounded text-white cursor-pointer hover:bg-zinc-800"
              >
                <p className="font-medium">{podcast.title}</p>
                <p className="text-sm text-gray-400">{podcast.host}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
