import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // If no user or role is not admin → redirect to home page
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  // Else render the child component
  return children;
}
