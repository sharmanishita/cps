import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import CoursePage from './components/CoursePage';
import ProtectedRoute from './contexts/ProtectedRoute';
import ChatWidget from "./ChatWidget.tsx";
import AdminLayout from './components/AdminLayout';
import AdminReports from './components/AdminReports';

// New pages
import ProgressPage from './components/ProgressPage';
import MyCoursesPage from './components/MyCoursePage';
import AllCoursesPage from './components/AllCoursesPage';
import AchievementsPage from './components/AchievementPage';
import RecommendationsPage from './components/RecommendationPage';
import KnowledgeGraphPage from './components/KnowledgeGraphPage';
import AdminUserManagement from './components/AdminUserManagement';
import AdminAnalytics from './components/AdminAnalytics';
import AdminSystemSettings from './components/AdminSystemSettings';
import AdminMessages from './components/AdminMessages';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatWidget />
        <Router>
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
              path="/progress"
              element={
                <ProtectedRoute requiredRole="user">
                  <ProgressPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-courses"
              element={
                <ProtectedRoute requiredRole="user">
                  <MyCoursesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/all-courses"
              element={
                <ProtectedRoute requiredRole="user">
                  <AllCoursesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/achievements"
              element={
                <ProtectedRoute requiredRole="user">
                  <AchievementsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/recommendations"
              element={
                <ProtectedRoute requiredRole="user">
                  <RecommendationsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/knowledge-graph"
              element={
                <ProtectedRoute requiredRole="user">
                  <KnowledgeGraphPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout>
                    <AdminHome />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/add-course"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout>
                    <AdminHome showAddCourseForm={true} />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout>
                    <AdminReports />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout>
                    <AdminUserManagement />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout>
                    <AdminAnalytics />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout>
                    <AdminSystemSettings />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/messages"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout>
                    <AdminMessages />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/course/:slug"
              element={
                <ProtectedRoute requiredRole="user">
                  <CoursePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
