import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/api"; 
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";
import LoadingSpinner from "../components/LoadingSpinner"; // Added: Import LoadingSpinner

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [topics, setTopics] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added: Loading state

  const login = useAuthStore((state) => state.login);
  const setProfile = useUserStore((state) => state.setProfile);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setIsLoading(true); // Added: Set loading to true on submission start

    try {
      const userPayload = {
        name,
        username,
        password,
        email,
        progress: topics.split(",").map((topic) => topic.trim()).filter(Boolean),
      };

      const res = await api.post("/register", userPayload);

      if (res.status === 201) {
        const userData = res.data.user;
        login(userData.username);
        setProfile(userData);
        navigate(`/dashboard/${userData.username}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false); // Added: Set loading to false when submission finishes
    }
  };

  return (
    <div className="card bg-dark text-white p-4 shadow-lg rounded" style={{ maxWidth: '480px', width: '100%' }}>
      <h2 className="card-title text-center text-primary mb-4 fs-2">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label text-white">Full Name:</label>
          <input
            id="fullName"
            type="text"
            className="form-control form-control-lg bg-dark-subtle text-dark-contrast border-secondary"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
            disabled={isLoading} // Added: Disable input when loading
          />
        </div>

        <div className="mb-3">
          <label htmlFor="regUsername" className="form-label text-white">Username:</label>
          <input
            id="regUsername"
            type="text"
            className="form-control form-control-lg bg-dark-subtle text-dark-contrast border-secondary"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            required
            disabled={isLoading} // Added: Disable input when loading
          />
        </div>

        <div className="mb-3">
          <label htmlFor="regPassword" className="form-label text-white">Password:</label>
          <input
            id="regPassword"
            type="password"
            className="form-control form-control-lg bg-dark-subtle text-dark-contrast border-secondary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
            disabled={isLoading} // Added: Disable input when loading
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label text-white">Email:</label>
          <input
            id="email"
            type="email"
            className="form-control form-control-lg bg-dark-subtle text-dark-contrast border-secondary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            disabled={isLoading} // Added: Disable input when loading
          />
        </div>

        <div className="mb-4">
          <label htmlFor="topicsCovered" className="form-label text-white">Topics Already Covered (comma-separated):</label>
          <textarea
            id="topicsCovered"
            className="form-control bg-dark-subtle text-dark-contrast border-secondary"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            placeholder="e.g. Recursion, Loops, Functions"
            rows={4}
            disabled={isLoading} // Added: Disable input when loading
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg w-100"
          disabled={isLoading} // Added: Disable button when loading
        >
          {isLoading ? <LoadingSpinner size="sm" /> : "Register"} {/* Added: Display spinner or text */}
        </button>
      </form>

      {error && <div className="alert alert-danger mt-4 text-center">{error}</div>}
      <p className="mt-4 text-center text-white">
        Already have an account? <Link to="/login" className="text-info fw-bold">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;