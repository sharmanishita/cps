import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/api"; // or "../../lib/api" based on depth
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";
import LoadingSpinner from "../components/LoadingSpinner"; // Import LoadingSpinner

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added: Loading state

  const login = useAuthStore((state) => state.login);
  const setProfile = useUserStore((state) => state.setProfile);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setIsLoading(true); // Added: Set loading to true when login starts

    try {
      const res = await api.post("/login", { username, password });

      if (res.status === 200) {
        const userData = res.data.user;
        login(userData.username);
        setProfile(userData);
        navigate(`/dashboard/${userData.username}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false); // Added: Set loading to false when login attempt finishes
    }
  };

  return (
    <div className="card bg-dark text-white p-4 shadow-lg rounded" style={{ maxWidth: '480px', width: '100%' }}>
      <h2 className="card-title text-center text-primary mb-4 fs-2">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label text-white">Username:</label>
          <input
            id="username"
            type="text"
            className="form-control form-control-lg bg-dark-subtle text-dark-contrast border-secondary"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            disabled={isLoading} // Added: Disable input when loading
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label text-white">Password:</label>
          <input
            id="password"
            type="password"
            className="form-control form-control-lg bg-dark-subtle text-dark-contrast border-secondary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            disabled={isLoading} // Added: Disable input when loading
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-lg w-100"
          disabled={isLoading} // Added: Disable button when loading
        >
          {isLoading ? <LoadingSpinner size="sm" /> : "Login"} {/* Added: Display spinner or text */}
        </button>
      </form>

      {error && <div className="alert alert-danger mt-4 text-center">{error}</div>}
      <p className="mt-4 text-center text-white">
        Don't have an account? <Link to="/register" className="text-info fw-bold">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;