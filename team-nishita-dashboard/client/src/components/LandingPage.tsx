import React, { useState } from 'react';
import './LandingPage.css';
import { signup, login } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Lucide icons
import {
  Compass,
  LogIn,
  UserPlus,
  LineChart,
  Share2,
  Bot,
  Sparkles,
  ClipboardCheck
} from 'lucide-react';

interface Props {
  onLogin: (user: { username: string }) => void;
}

const LandingPage: React.FC<Props> = ({ onLogin }) => {
  const [modalType, setModalType] = useState<'login' | 'signup' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const closeModal = () => {
    setModalType(null);
    setUsername('');
    setPassword('');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const credentials = { username, password };
      const response =
        modalType === 'login'
          ? await login(credentials)
          : await signup(credentials);

      const token = response.data.access_token;
      localStorage.setItem('token', token);

      const decoded = jwtDecode<{ username: string }>(token);
      onLogin({ username: decoded.username });

      closeModal();
      navigate('/home');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Compass size={24} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          <span>PathPilot</span>
        </div>
        <nav>
          <button onClick={() => setModalType('login')}>
            <LogIn size={16} className="icon-inline" />
            <span>Login</span>
          </button>
          <button onClick={() => setModalType('signup')}>
            <UserPlus size={16} className="icon-inline" />
            <span>Sign Up</span>
          </button>
        </nav>
      </header>

      <section className="hero">
        <p className="hero-title">
          Visualize Your Learning Journey
        </p>
        <p className="hero-subtitle">
          PathPilot helps you understand where you are, what to study next, and how close you are to your goals.
        </p>

        <div className="features">
          <div className="feature">
            <LineChart size={32} className="feature-icon" />
            <strong>Progress Tracking</strong>
            <p>Track your learning goals and monitor real-time progress with intuitive charts.</p>
          </div>

          <div className="feature">
            <Share2 size={32} className="feature-icon" />
            <strong>Knowledge Graph</strong>
            <p>Visualize concepts you've learned and identify knowledge gaps clearly.</p>
          </div>

          <div className="feature">
            <Bot size={32} className="feature-icon" />
            <strong>AI Chat Assistant</strong>
            <p>Ask questions anytime and get smart explanations powered by AI.</p>
          </div>

          <div className="feature">
            <Sparkles size={32} className="feature-icon" />
            <strong>Recommendations</strong>
            <p>Receive personalized learning path suggestions based on your progress.</p>
          </div>

          <div className="feature">
            <ClipboardCheck size={32} className="feature-icon" />
            <strong>Assessments</strong>
            <p>Take quick quizzes to reinforce concepts and track understanding.</p>
          </div>
        </div>
      </section>

      {modalType && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="form-container">
              <h2>{modalType === 'login' ? 'Login' : 'Sign Up'}</h2>
              {error && <p style={{ color: 'red', marginBottom: '0.5rem' }}>{error}</p>}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">
                  {modalType === 'login' ? (
                    <>
                      <LogIn size={16} className="icon-inline" />
                      <span>Login</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} className="icon-inline" />
                      <span>Sign Up</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
