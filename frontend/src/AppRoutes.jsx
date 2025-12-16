import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AnalyticsDashboard from './pages/analytics-dashboard';
import SupportCenter from './pages/support-center';
import StudentProfile from './pages/student-profile';
import LiveAttendance from './pages/live-attendance';
import Dashboard from './pages/dashboard';
import AdminConsole from './pages/admin-console';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/support-center" element={<SupportCenter />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/live-attendance" element={<LiveAttendance />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-console" element={<AdminConsole />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
