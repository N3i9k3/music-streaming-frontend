const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-zinc-900 rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
