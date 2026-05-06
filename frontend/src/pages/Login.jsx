import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import authService from "../services/authService";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { refreshData } = useData();

  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const data = await authService.login({ email, password });

      // Determine role from backend response
      const role = data.user?.role || userType;

      login(
        {
          id: data.user?.id || data.student?.id,
          name: data.user?.name || data.student?.name || "User",
          email: data.user?.email || email,
          rollNo: data.student?.rollNo,
          role,
          // Keep "type" for legacy compat with existing pages
          type: role === "teacher" ? "lecturer" : role,
        },
        data.token
      );

      // Clear fields on success
      setEmail("");
      setPassword("");
      setError("");

      // Reload data with fresh token
      refreshData();

      // Route based on role
      if (role === "student") {
        navigate("/student-profile");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0] ||
        err.message ||
        "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg border">
        <h1 className="text-3xl font-bold text-center mb-2">AttendEase</h1>
        <p className="text-center text-muted-foreground mb-6">
          Attendance Management System
        </p>

        {/* USER TYPE */}
        <div className="flex gap-3 mb-6">
          <button
            type="button"
            onClick={() => { setUserType("student"); setError(""); }}
            className={`flex-1 py-2 rounded-lg border transition-colors ${
              userType === "student" ? "bg-primary text-white" : "bg-muted"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => { setUserType("lecturer"); setError(""); }}
            className={`flex-1 py-2 rounded-lg border transition-colors ${
              userType === "lecturer" ? "bg-primary text-white" : "bg-muted"
            }`}
          >
            Lecturer
          </button>
        </div>

        {/* HINT for lecturer */}
        {userType === "lecturer" && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg">
            <p className="text-xs text-blue-700 dark:text-blue-400">
              <strong>Default:</strong> teacher@attendease.edu / teacher123
            </p>
          </div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder={userType === "student" ? "Student Email" : "Lecturer Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        {/* REGISTER — STUDENTS ONLY */}
        {userType === "student" && (
          <>
            <div className="my-5 text-center text-sm text-muted-foreground">
              Don't have an account?
            </div>

            <Button
              type="button"
              onClick={() => navigate("/register")}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Create Student Account
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
