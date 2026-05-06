import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import authService from "../services/authService";

/**
 * ForgotPassword Component
 * Enhanced with 3-step flow, OTP hashing, and Resend Timer.
 */
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  
  // Form States
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // UI States
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  // Timer logic for Resend OTP
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  /**
   * Step 1: Request OTP
   */
  const handleRequestOTP = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setMessage("Success! Verification code sent to your email.");
      setStep(2);
      setTimer(60); // Start 60s cooldown
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Step 2: Verify OTP
   */
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      await authService.verifyOTP({ email, otp });
      setMessage("OTP verified successfully!");
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Step 3: Reset Password
   */
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Strong password validation regex (matching backend)
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!strongPasswordRegex.test(newPassword)) {
      setError("Password must be at least 8 characters, include uppercase, lowercase, number and special character.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword({ email, otp, newPassword });
      setMessage("Success! Your password has been reset.");
      
      // Auto-navigate to login after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg border animate-in fade-in zoom-in duration-300">
        <h1 className="text-3xl font-bold text-center mb-2">AttendEase</h1>
        
        {/* STEP INDICATOR */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`h-1.5 w-8 rounded-full transition-all duration-500 ${step >= s ? 'bg-primary' : 'bg-muted'}`} 
            />
          ))}
        </div>

        <p className="text-center text-muted-foreground mb-6 font-medium">
          {step === 1 && "Identify Your Account"}
          {step === 2 && "Verification Code"}
          {step === 3 && "Create New Password"}
        </p>

        {/* MESSAGES */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg animate-in slide-in-from-top-1">
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg animate-in slide-in-from-top-1">
            <p className="text-sm text-green-600 dark:text-green-400 font-medium">{message}</p>
          </div>
        )}

        {/* STEP 1: EMAIL */}
        {step === 1 && (
          <form onSubmit={handleRequestOTP} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter your email address and we'll send you a 6-digit code to reset your password.
            </p>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" loading={loading}>
              Send OTP
            </Button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-sm text-primary hover:underline transition-all"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We've sent a code to <strong>{email}</strong>. Please enter it below to verify.
            </p>
            <Input
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              required
              className="text-center text-lg tracking-widest font-bold"
            />
            <Button type="submit" className="w-full" loading={loading}>
              Verify Code
            </Button>
            <div className="text-center mt-4">
              <button
                type="button"
                disabled={timer > 0 || loading}
                onClick={handleRequestOTP}
                className={`text-sm font-medium transition-all ${
                  timer > 0 ? "text-muted-foreground cursor-not-allowed" : "text-primary hover:underline"
                }`}
              >
                {timer > 0 ? `Resend code in ${timer}s` : "Resend OTP"}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: RESET */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your account is verified. Choose a strong new password to secure your account.
            </p>
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" loading={loading}>
              Reset Password
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
