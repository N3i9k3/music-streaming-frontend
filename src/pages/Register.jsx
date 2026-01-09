import { useState } from "react";
import { supabase } from "../services/api";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorFallback from "../components/ErrorFallback";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 🔹 Centralized Supabase signup
      const { error: signupError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (signupError) throw new Error(signupError.message);

      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err.message || err);
      setError(err.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 pb-32 min-h-screen flex items-center justify-center">
      {loading && <Loader />}
      {error && <ErrorFallback message={error} />}

      <form
        onSubmit={handleSignup}
        className="bg-gray-800 p-6 rounded-lg w-full max-w-sm space-y-4"
      >
        <h1 className="text-white text-2xl font-bold text-center">Register</h1>

        <input
          type="email"
          className="w-full p-2 rounded bg-gray-900 text-white outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full p-2 rounded bg-gray-900 text-white outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded hover:opacity-90 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
