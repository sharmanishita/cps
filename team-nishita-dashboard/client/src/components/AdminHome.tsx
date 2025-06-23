import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import { Users, BarChart3, FileText, Settings, Activity } from 'lucide-react';

const AdminHome: React.FC = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();

  const getAnimationProps = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay,
      duration: 0.6,
      type: "spring" as const,
    },
  });

  const stats = [
    { icon: <Users size={24} />, label: "Total Users", value: "1,240" },
    { icon: <Activity size={24} />, label: "Active Sessions", value: "342" },
    { icon: <FileText size={24} />, label: "Reports Generated", value: "87" },
    { icon: <BarChart3 size={24} />, label: "Completion Rate", value: "78%" },
  ];

  const recentActivities = [
    "New user 'jdoe' registered",
    "System backup completed successfully",
    "3 new messages received",
    "Course 'React Basics' updated",
    "Weekly report generated"
  ];

  return (
    <div className={`page-container ${darkMode ? 'dark' : 'light'}`}>
      <Navbar />

      <main className="main-content">
        <div className="content-wrapper">
          <motion.div className="page-header" {...getAnimationProps(0)}>
            <h1 className="page-title">Admin Dashboard</h1>
            <p className="page-subtitle">
              Welcome back, {user?.username}! Here's your system overview.
            </p>
          </motion.div>

          <motion.div className="admin-stats-grid" {...getAnimationProps(0.1)}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                {...getAnimationProps(0.2 + index * 0.1)}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-value">{stat.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="admin-content-grid">
            <motion.div className="admin-card" {...getAnimationProps(0.3)}>
              <div className="card-header">
                <Settings size={24} />
                <h3>System Management</h3>
              </div>
              <div className="card-content">
                <div className="admin-actions">
                  <button className="admin-btn primary">Manage Users</button>
                  <button className="admin-btn secondary">View Reports</button>
                  <button className="admin-btn secondary">System Settings</button>
                  <button className="admin-btn secondary">Backup Data</button>
                </div>
              </div>
            </motion.div>

            <motion.div className="admin-card" {...getAnimationProps(0.4)}>
              <div className="card-header">
                <Activity size={24} />
                <h3>Recent Activity</h3>
              </div>
              <div className="card-content">
                <div className="activity-list">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-dot"></div>
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div className="admin-card chart-card" {...getAnimationProps(0.5)}>
              <div className="card-header">
                <BarChart3 size={24} />
                <h3>Analytics Overview</h3>
              </div>
              <div className="card-content">
                <div className="chart-placeholder">
                  <p>Analytics charts would be displayed here</p>
                  <div className="mock-chart">
                    <div className="chart-bar" style={{ height: '60%' }}></div>
                    <div className="chart-bar" style={{ height: '80%' }}></div>
                    <div className="chart-bar" style={{ height: '45%' }}></div>
                    <div className="chart-bar" style={{ height: '90%' }}></div>
                    <div className="chart-bar" style={{ height: '70%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;
