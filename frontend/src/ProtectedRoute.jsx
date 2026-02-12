import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
