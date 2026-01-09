const Button = ({ children, onClick, className = "", disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-black disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
