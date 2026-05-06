import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Lazy-loaded pages for better performance
const Dashboard = lazy(() => import("./pages/dashboard"));
const LiveAttendance = lazy(() => import("./pages/live-attendance"));
const AdminConsole = lazy(() => import("./pages/admin-console"));
const ManageStudents = lazy(() => import("./pages/admin-console/ManageStudents"));
const ManageSubjects = lazy(() => import("./pages/admin-console/ManageSubjects"));
const StudentProfile = lazy(() => import("./pages/student-profile"));
const Analytics = lazy(() => import("./pages/analytics"));
const SupportCenter = lazy(() => import("./pages/SupportCenter"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Root */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student */}
        <Route
          path="/student-profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        {/* Admin / Lecturer / Student (dashboard access) */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin", "student", "lecturer"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/live-attendance"
            element={
              <ProtectedRoute allowedRoles={["teacher", "admin", "lecturer"]}>
                <LiveAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-console"
            element={
              <ProtectedRoute allowedRoles={["teacher", "admin", "lecturer"]}>
                <AdminConsole />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-console/manage-students"
            element={
              <ProtectedRoute allowedRoles={["teacher", "admin", "lecturer"]}>
                <ManageStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-console/manage-subjects"
            element={
              <ProtectedRoute allowedRoles={["teacher", "admin", "lecturer"]}>
                <ManageSubjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute allowedRoles={["teacher", "admin", "lecturer"]}>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route path="/support-center" element={<SupportCenter />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
