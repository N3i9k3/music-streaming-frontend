import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api"; // centralized API
import { Input, Button } from "../components"; // reusable components
import ErrorFallback from "../components/ErrorFallback"; // optional friendly error display

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = await loginUser({ email, password }); // API call
      if (!user.token) throw new Error("Invalid login response");

      // 1️⃣ Save token in localStorage
      localStorage.setItem("token", user.token);

      // 2️⃣ Optional: save user info
      localStorage.setItem("userEmail", user.email);

      // 3️⃣ Redirect to dashboard/home page
      navigate("/dashboard"); 
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 pb-32 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-6 rounded-lg w-full max-w-sm space-y-4"
      >
        <h1 className="text-white text-2xl font-bold text-center">Login</h1>

        {error && <ErrorFallback message={error} />}

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
