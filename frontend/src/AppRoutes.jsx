import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AnalyticsDashboard from './pages/analytics-dashboard';
import SupportCenter from './pages/support-center';
import StudentProfile from './pages/student-profile';
import LiveAttendance from './pages/live-attendance';
import Dashboard from './pages/dashboard';
import AdminConsole from './pages/admin-console';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

// Protected Route Component
const ProtectedRoute = ({ element, allowedTypes = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(user?.type)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
          <ErrorBoundary>
            <ScrollToTop />
            <RouterRoutes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

            {/* Default route - redirect to login */}
            <Route 
              path="/" 
              element={<Navigate to="/login" replace />} 
            />

            {/* Protected Routes - All Users */}
            <Route 
              path="/support-center" 
              element={<ProtectedRoute element={<SupportCenter />} />} 
            />

            {/* Protected Routes - Lecturer Only */}
            <Route 
              path="/dashboard" 
              element={<ProtectedRoute element={<Dashboard />} allowedTypes={['lecturer']} />} 
            />
            <Route 
              path="/analytics-dashboard" 
              element={<ProtectedRoute element={<AnalyticsDashboard />} allowedTypes={['lecturer']} />} 
            />
            <Route 
              path="/live-attendance" 
              element={<ProtectedRoute element={<LiveAttendance />} allowedTypes={['lecturer']} />} 
            />
            <Route 
              path="/admin-console/*" 
              element={<ProtectedRoute element={<AdminConsole />} allowedTypes={['lecturer']} />} 
            />

            {/* Protected Routes - Student Only */}
            <Route 
              path="/student-profile" 
              element={<ProtectedRoute element={<StudentProfile />} allowedTypes={['student']} />} 
            />

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </ErrorBoundary>
      </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  );
};

export default Routes;
