import React from 'react';
import { UserPlus, LogIn, LogOut, Compass, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onSignUpClick }) => {
  const { isAuthenticated, logout, user } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Compass className="navbar-icon" />
          <span>PathPilot</span>
        </div>

        <div className="navbar-actions">
          <button
            onClick={toggleDarkMode}
            className="theme-toggle-btn"
            title="Toggle Theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isAuthenticated ? (
            <div className="auth-section">
              <span className="welcome-text">Welcome, {user?.username}</span>
              <button onClick={logout} className="nav-btn logout-btn">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-section">
              <button onClick={onLoginClick} className="nav-btn login-btn">
                <LogIn size={16} />
                Login
              </button>
              <button onClick={onSignUpClick} className="nav-btn signup-btn">
                <UserPlus size={16} />
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
