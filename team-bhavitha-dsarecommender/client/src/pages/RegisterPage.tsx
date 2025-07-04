import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {authApi} from "../lib/api";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";
import Select from "react-select";
import { validTopics } from "../data/validTopic"; // Assuming validTopics is an array of strings
import { Eye, EyeOff } from "lucide-react";
import LoadingWithQuotes from "../components/LoadingWithQuotes";
import DashboardBackground from "../components/DashboardBackground"; // Re-importing as requested

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<{ value: string; label: string }[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const login = useAuthStore((state) => state.login);
  const setProfile = useUserStore((state) => state.setProfile);
  const navigate = useNavigate();

  const getPasswordStrength = (password: string): { score: number; label: string } => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    if (password.length >= 10) score++;

    const labels = ["Too Weak", "Weak", "Moderate", "Strong", "Very Strong"];
    return { score, label: labels[score] };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError("Password must contain at least one uppercase letter and one special character.");
      setIsLoading(false);
      return;
    }

    try {
      const userPayload = {
        name,
        username,
        password,
        email,
        progress: topics,
      };

      const res = await authApi.post("/register", userPayload);

      if (res.status === 201) {
        const userData = res.data.user;
        login(userData.username);
        setProfile(userData);
        navigate(`/dashboard/${userData.username}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Renders DashboardBackground directly as requested */}
      <DashboardBackground />

      {/* This is the full-screen overlay with blur, as requested */}
      <div className="relative z-10 flex items-center justify-center min-h-screen bg-white/60 backdrop-blur-sm">
        {/* The outer white card, as in your provided code */}
        <div className="p-8 rounded-xl shadow-xl bg-white/80 max-w-md w-full">
          {isLoading && <LoadingWithQuotes />} {/* Loading overlaying the white card */}

          {/* The main dark registration card */}
          <div
            className={`card bg-dark text-white p-4 shadow-lg rounded-4 w-100 ${
              isLoading ? "opacity-60 blur-sm" : ""
            }`}
            style={{ maxWidth: "800px" }} // Adjusted maxWidth for 2-column
          >
            <h2 className="card-title text-center text-primary mb-4 fs-2 fw-bold">
              Create Your Account
            </h2>

            {/* Form content with 2-column layout */}
            <form onSubmit={handleRegister}>
              <div className="row">
                {/* Full Name */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name:
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    className="form-control form-control-lg bg-dark-subtle text-dark-contrast border-secondary"
                    placeholder="e.g. Anurag Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Username */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="regUsername" className="form-label">
                    Username:
                  </label>
                  <input
                    id="regUsername"
                    type="text"
                    className="form-control form-control-lg bg-dark-subtle text-dark-contrast border-secondary"
                    placeholder="Choose a unique username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="row">
                {/* Password */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="regPassword" className="form-label">
                    Password:
                  </label>
                  <div className="input-group">
                    <input
                      id="regPassword"
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-lg bg-dark-subtle text-dark-contrast border-secondary"
                      placeholder="Use at least 1 uppercase & special character"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    <span
                      className="input-group-text bg-white"
                      role="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>
                  <div className="progress mt-2" style={{ height: "6px" }}>
                    <div
                      className={`progress-bar ${
                        ["bg-danger", "bg-warning", "bg-info", "bg-success"][
                          passwordStrength.score - 1
                        ] || "bg-secondary"
                      }`}
                      style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                    />
                  </div>
                  <small className="text-muted">Strength: {passwordStrength.label}</small>
                </div>

                {/* Confirm Password */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password:
                  </label>
                  <div className="input-group">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control form-control-lg bg-dark-subtle text-dark-contrast border-secondary"
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    <span
                      className="input-group-text bg-white"
                      role="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control form-control-lg bg-dark-subtle text-dark-contrast border-secondary"
                  placeholder="e.g. anurag@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Topics Already Covered */}
              <div className="mb-4">
                <label htmlFor="topics" className="form-label">
                  Topics Already Covered:
                </label>
                <Select
                  id="topics"
                  isMulti
                  options={validTopics.map((topic) => ({ value: topic, label: topic }))}
                  value={selectedTopics}
                  onChange={(selected) => {
                    const selectedArr = selected as { value: string; label: string }[];
                    setSelectedTopics(selectedArr);
                    setTopics(selectedArr.map((opt) => opt.value));
                  }}
                  isDisabled={isLoading}
                  className="text-dark" // Ensures Select component styling works with dark theme
                  classNamePrefix="select"
                  placeholder="Select covered topics (optional)"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100" disabled={isLoading}>
                Register
              </button>
            </form>

            {error && <div className="alert alert-danger mt-4 text-center">{error}</div>}
            <p className="mt-4 text-center text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-info fw-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;