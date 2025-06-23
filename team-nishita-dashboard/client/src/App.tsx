// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './contexts/ProtectedRoute';
import LandingPage from './components/LandingPage';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="user">
                <UserHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminHome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
