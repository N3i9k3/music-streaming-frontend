import { useNavigate } from "react-router-dom";

const PodcastCard = ({ podcast }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/podcasts/${podcast.id}`)}
      className="
        bg-gray-800
        rounded-lg
        p-3
        cursor-pointer
        hover:bg-gray-700
        hover:scale-105
        transition-all
        duration-200
      "
    >
      <img
        src={podcast.cover_url}
        alt={podcast.title}
        className="
          w-full
          h-40
          object-cover
          rounded-md
          hover:opacity-80
          transition
        "
      />
      <h3 className="font-semibold text-white truncate mt-2">
        {podcast.title}
      </h3>
      <p className="text-sm text-gray-400 line-clamp-2">
        {podcast.description}
      </p>
    </div>
  );
};

export default PodcastCard;
