import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rollNo: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      // Validation
      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.rollNo) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (!formData.email.includes('@')) {
        setError('Please enter a valid email');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      if (!formData.agreeToTerms) {
        setError('Please agree to the terms and conditions');
        setLoading(false);
        return;
      }

      // Mock registration - Students only, in real app this would be an API call
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        fullName: formData.fullName,
        type: 'student', // Always student type
        rollNo: formData.rollNo,
        registrationTime: new Date().toISOString()
      };

      register(userData);
      navigate('/student-profile');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-background flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary mb-4">
            <Icon name="BarChart3" size={24} className="text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">AttendEase</h1>
          <p className="text-muted-foreground mt-2">Student Registration</p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-xl border border-border shadow-lg p-8">
          {/* Student Badge */}
          <div className="mb-6 p-3 rounded-lg bg-primary/10 border border-primary/20 flex items-start gap-3">
            <Icon name="Users" size={20} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Student Registration</p>
              <p className="text-xs text-muted-foreground mt-1">Create your student account to access the attendance system</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <div className="relative">
                <Icon name="User" size={16} className="absolute left-3 top-3 text-muted-foreground" />
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Icon name="Mail" size={16} className="absolute left-3 top-3 text-muted-foreground" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Roll No */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Roll Number
              </label>
              <div className="relative">
                <Icon name="Hash" size={16} className="absolute left-3 top-3 text-muted-foreground" />
                <Input
                  type="text"
                  name="rollNo"
                  placeholder="e.g., STU-2024-001"
                  value={formData.rollNo}
                  onChange={handleInputChange}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Icon name="Lock" size={16} className="absolute left-3 top-3 text-muted-foreground" />
                <Input
                  type="password"
                  name="password"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Icon name="Lock" size={16} className="absolute left-3 top-3 text-muted-foreground" />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
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

            {/* Terms Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="rounded mt-1"
              />
              <span className="text-sm text-muted-foreground">
                I agree to the <a href="#" className="text-primary hover:text-primary/80 font-medium">terms and conditions</a> and <a href="#" className="text-primary hover:text-primary/80 font-medium">privacy policy</a>
              </span>
            </label>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? (
                <>
                  <Icon name="Loader2" size={16} className="inline mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <Icon name="UserPlus" size={16} className="inline mr-2" />
                  Create Account
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px bg-border flex-1"></div>
            <span className="text-xs text-muted-foreground">Already registered?</span>
            <div className="h-px bg-border flex-1"></div>
          </div>

          {/* Login Link */}
          <Button
            onClick={() => navigate('/login')}
            className="w-full bg-muted text-foreground hover:bg-muted/80 border border-border"
          >
            <Icon name="LogIn" size={16} className="inline mr-2" />
            Back to Login
          </Button>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 rounded-lg bg-warning/10 border border-warning/20">
          <div className="flex items-start gap-3">
            <Icon name="Lock" size={16} className="text-warning mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">🔒 Security Note</p>
              <p>Lecturers and staff must contact their administrator to create their accounts. This ensures proper access control and data security.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
