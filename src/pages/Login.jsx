import { useAuth } from "../context/AuthContext";

const { login } = useAuth();

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const user = await loginUser({ email, password }); // backend login
    login(user); // ✅ update AuthContext
    navigate("/"); // redirect to Home
  } catch (err) {
    console.error("Login failed:", err);
    setError(err.message || "Login failed");
  } finally {
    setLoading(false);
  }
};
