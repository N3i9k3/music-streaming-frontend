const CategoryFilter = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex gap-3 mb-6 overflow-x-auto">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-1 rounded ${
          selected === null ? "bg-green-500" : "bg-gray-700"
        }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-4 py-1 rounded ${
            selected === cat.id ? "bg-green-500" : "bg-gray-700"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
