const Input = ({ value, onChange, placeholder, className = "", ...props }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-3 py-2 rounded bg-zinc-800 text-white outline-none ${className}`}
      {...props}
    />
  );
};

export default Input;
