import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { students } = useData();
  const [userType, setUserType] = useState('student'); // 'student' or 'lecturer'
  const [studentName, setStudentName] = useState('');
  const [lecturerEmail, setLecturerEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      if (userType === 'student') {
        // Student login validation
        if (!studentName || !password) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }

        // Check if student exists in admin's student list
        const studentExists = students.find(s => s.name.toLowerCase() === studentName.toLowerCase());
        
        if (!studentExists) {
          setError(`Student "${studentName}" not found in the system. Please contact your administrator.`);
          setLoading(false);
          return;
        }

        // Mock authentication - student login successful
        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          email: studentExists.email,
          name: studentExists.name,
          rollNo: studentExists.roll,
          branch: studentExists.branch,
          type: 'student',
          loginTime: new Date().toISOString()
        };

        login(userData);
        navigate('/student-profile');
      } else {
        // Lecturer login validation
        if (!lecturerEmail || !password) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }

        if (!lecturerEmail.includes('@')) {
          setError('Please enter a valid email');
          setLoading(false);
          return;
        }

        // Mock authentication - lecturer login
        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          email: lecturerEmail,
          type: 'lecturer',
          name: 'Lecturer User',
          loginTime: new Date().toISOString()
        };

        login(userData);
        navigate('/dashboard');
      }

      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary mb-4">
            <Icon name="BarChart3" size={24} className="text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">AttendEase</h1>
          <p className="text-muted-foreground mt-2">Attendance Management System</p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-xl border border-border shadow-lg p-8">
          {/* User Type Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">
              Login As
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setUserType('student');
                  setError('');
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 border ${
                  userType === 'student'
                    ? 'bg-primary text-primary-foreground border-primary shadow-md'
                    : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                }`}
              >
                <Icon name="Users" size={16} className="inline mr-2" />
                Student
              </button>
              <button
                onClick={() => {
                  setUserType('lecturer');
                  setError('');
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 border ${
                  userType === 'lecturer'
                    ? 'bg-primary text-primary-foreground border-primary shadow-md'
                    : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                }`}
              >
                <Icon name="Award" size={16} className="inline mr-2" />
                Lecturer
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Student Name Input - Only for Students */}
            {userType === 'student' && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Student Name
                </label>
                <div className="relative">
                  <Icon name="User" size={16} className="absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            {/* Lecturer Email Input - Only for Lecturers */}
            {userType === 'lecturer' && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Icon name="Mail" size={16} className="absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={lecturerEmail}
                    onChange={(e) => setLecturerEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Icon name="Lock" size={16} className="absolute left-3 top-3 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-error/10 border border-error/20 flex items-start gap-3">
                <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
                <p className="text-sm text-error">{error}</p>
              </div>
            )}

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:text-primary/80 font-medium">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? (
                <>
                  <Icon name="Loader2" size={16} className="inline mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={16} className="inline mr-2" />
                  Login
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px bg-border flex-1"></div>
            <span className="text-xs text-muted-foreground">Don't have an account?</span>
            <div className="h-px bg-border flex-1"></div>
          </div>

          {/* Register Link */}
          <Button
            onClick={() => navigate('/register')}
            className="w-full bg-muted text-foreground hover:bg-muted/80 border border-border"
          >
            <Icon name="UserPlus" size={16} className="inline mr-2" />
            Create New Account
          </Button>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
          <p className="text-xs font-medium text-foreground mb-2">Demo Credentials:</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p><span className="font-medium text-foreground">Student:</span> John Doe (or any name from student list) / password</p>
            <p><span className="font-medium text-foreground">Lecturer:</span> lecturer@attendease.edu / password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
