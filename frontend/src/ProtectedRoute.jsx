import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Normalize: accept both "teacher" and "lecturer"
  const normalizedRole = role === "lecturer" ? "teacher" : role;
  const normalizedAllowed = allowedRoles?.map((r) =>
    r === "lecturer" ? "teacher" : r
  );

  if (normalizedAllowed && !normalizedAllowed.includes(normalizedRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
