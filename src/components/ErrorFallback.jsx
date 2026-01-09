const ErrorFallback = ({ message }) => {
  return (
    <div className="text-center text-red-400 mt-10">
      {message || "Something went wrong"}
    </div>
  );
};

export default ErrorFallback;
