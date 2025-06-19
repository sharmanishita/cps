import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import { BookOpen, TrendingUp, Award, Play } from 'lucide-react';

const UserHome: React.FC = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();

  return (
    <div className={`page-container ${darkMode ? 'dark' : 'light'}`}>
      <Navbar />

      <main className="main-content">
        <div className="content-wrapper">
          <div className="page-header">
            <h1 className="page-title">Welcome to Your Learning Hub!</h1>
            <p className="page-subtitle">
              Hello {user?.username}! This is your central space to discover new content,
              track your progress, and embark on exciting learning adventures.
            </p>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card featured-card">
              <div className="card-header">
                <BookOpen size={24} />
                <h3>Featured Course</h3>
              </div>
              <div className="card-content">
                <h4 className="course-title">Introduction to AI</h4>
                <p className="course-desc">
                  Discover the fundamentals of Artificial Intelligence and its applications.
                </p>
                <button className="course-btn">
                  <Play size={16} />
                  Start Learning
                </button>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <TrendingUp size={24} />
                <h3>Your Progress</h3>
              </div>
              <div className="card-content">
                <div className="progress-item">
                  <span>Courses Completed</span>
                  <span className="progress-value">3</span>
                </div>
                <div className="progress-item">
                  <span>Hours Learned</span>
                  <span className="progress-value">24</span>
                </div>
                <div className="progress-item">
                  <span>Certificates Earned</span>
                  <span className="progress-value">2</span>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <Award size={24} />
                <h3>Achievements</h3>
              </div>
              <div className="card-content">
                <p>Keep learning to unlock new achievements and badges!</p>
                <div className="achievement-badges">
                  <div className="badge">🏆 First Course</div>
                  <div className="badge">📚 Bookworm</div>
                </div>
              </div>
            </div>

            <div className="dashboard-card recommendations-card">
              <div className="card-header">
                <h3>Personalized for You</h3>
              </div>
              <div className="card-content">
                <p>You don't have any recommendations yet. Explore some courses to get started!</p>
                <button className="explore-btn">Explore Courses</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserHome;
