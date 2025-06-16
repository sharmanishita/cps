import React, { useState } from "react";
import type { FormEvent } from "react";

const Login: React.FC = () => {
  const [isSignup, setIsSignup] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(`${isSignup ? "Signed up" : "Logged in"} as ${email}`);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">{isSignup ? "Sign Up" : "Login"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            {isSignup ? "Sign Up" : "Login"}
          </button>
          <p className="text-center">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              className="btn btn-link ms-2 p-0"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;