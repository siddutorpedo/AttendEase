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
  const { students } = useData();

  const [userType, setUserType] = useState("student");
  const [studentName, setStudentName] = useState("");
  const [lecturerEmail, setLecturerEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (userType === "student") {
        if (!studentName || !password) {
          setError("Please fill in all fields");
          setLoading(false);
          return;
        }

        const studentExists = students.find(
          (s) => s.name.toLowerCase() === studentName.toLowerCase()
        );

        if (!studentExists) {
          setError("Student not found. Contact administrator.");
          setLoading(false);
          return;
        }

        login({
          id: Date.now(),
          name: studentExists.name,
          email: studentExists.email,
          rollNo: studentExists.roll,
          type: "student"
        });

        navigate("/student-profile");
      } else {
        if (!lecturerEmail || !password) {
          setError("Please fill in all fields");
          setLoading(false);
          return;
        }

        login({
          id: Date.now(),
          email: lecturerEmail,
          type: "lecturer",
          name: "Lecturer"
        });

        navigate("/dashboard");
      }

      setLoading(false);
    }, 600);
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
              placeholder="Student Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
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
