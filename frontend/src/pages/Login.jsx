import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import Icon from "../components/AppIcon";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { refreshData } = useData();

  const [userType, setUserType] = useState("student");
  const [studentEmail, setStudentEmail] = useState("");
  const [lecturerEmail, setLecturerEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (userType === "student") {
      if (!studentEmail || !password) {
        setError("Please fill in all fields");
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/students/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: studentEmail, password }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Invalid credentials");
        }

        if (data.token) {
          localStorage.setItem("attendeaseToken", data.token);
        }

        login({
          id: data.student.id,
          name: data.student.name,
          email: data.student.email,
          rollNo: data.student.rollNo,
          type: "student",
        });

        // Reload data (students, subjects, attendance) with fresh token
        refreshData();

        navigate("/student-profile");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      if (!lecturerEmail || !password) {
        setError("Please fill in all fields");
        return;
      }

      setLoading(true);
      try {
        // Simple local lecturer login for now
        login({
          id: Date.now(),
          email: lecturerEmail,
          type: "lecturer",
          name: "Lecturer",
        });
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
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
            onClick={() => setUserType("student")}
            className={`flex-1 py-2 rounded-lg border ${
              userType === "student" ? "bg-primary text-white" : "bg-muted"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setUserType("lecturer")}
            className={`flex-1 py-2 rounded-lg border ${
              userType === "lecturer" ? "bg-primary text-white" : "bg-muted"
            }`}
          >
            Lecturer
          </button>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          {userType === "student" && (
            <Input
              type="email"
              placeholder="Student Email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
            />
          )}

          {userType === "lecturer" && (
            <Input
              type="email"
              placeholder="Lecturer Email"
              value={lecturerEmail}
              onChange={(e) => setLecturerEmail(e.target.value)}
            />
          )}

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* REGISTER — STUDENTS ONLY */}
        {userType === "student" && (
          <>
            <div className="my-5 text-center text-sm text-muted-foreground">
              Don’t have an account?
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
