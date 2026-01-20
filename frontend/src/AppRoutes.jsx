import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/dashboard";
import LiveAttendance from "./pages/live-attendance";
import AdminConsole from "./pages/admin-console";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

export default function AppRoutes() {
  const { role } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      {/* 🔒 STUDENT-ONLY ROUTE */}
      <Route
        path="/register"
        element={
          role === "student" || role === null
            ? <Register />
            : <Navigate to="/login" replace />
        }
      />

      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/live-attendance" element={<LiveAttendance />} />
        <Route path="/admin-console" element={<AdminConsole />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
