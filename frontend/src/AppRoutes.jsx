import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/dashboard";
import LiveAttendance from "./pages/live-attendance";
import AdminConsole from "./pages/admin-console";
import ManageStudents from "./pages/admin-console/ManageStudents";
import ManageSubjects from "./pages/admin-console/ManageSubjects";
import StudentProfile from "./pages/student-profile";
import Analytics from "./pages/analytics";

import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
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

      {/* Admin / Lecturer */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["teacher", "admin", "student"]}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/live-attendance"
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <LiveAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-console"
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <AdminConsole />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-console/manage-students"
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <ManageStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-console/manage-subjects"
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <ManageSubjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <Analytics />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
