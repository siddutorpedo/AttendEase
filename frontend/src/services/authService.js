import api from "./api";

/**
 * Auth API service.
 */
const authService = {
  /**
   * Login any user (student, teacher, admin).
   * Uses the legacy /students/login endpoint for backward compat.
   */
  login: async ({ email, password }) => {
    const { data } = await api.post("/students/login", { email, password });
    return data;
  },

  /**
   * Register a new student.
   */
  register: async ({ name, email, password, rollNo, branch, year, section }) => {
    const { data } = await api.post("/students/register", {
      name,
      email,
      password,
      role: "student",
      rollNo,
      branch,
      year,
      section,
    });
    return data;
  },

  /**
   * Get current user profile.
   */
  getMe: async () => {
    const { data } = await api.get("/v1/auth/me");
    return data;
  },

  /**
   * Request password reset OTP.
   */
  forgotPassword: async (email) => {
    const { data } = await api.post("/v1/auth/forgot-password", { email });
    return data;
  },

  /**
   * Verify OTP and reset password.
   */
  resetPassword: async ({ email, otp, newPassword }) => {
    const { data } = await api.post("/v1/auth/reset-password", {
      email,
      otp,
      newPassword,
    });
    return data;
  },

  /**
   * Verify OTP without resetting.
   */
  verifyOTP: async ({ email, otp }) => {
    const { data } = await api.post("/v1/auth/verify-otp", {
      email,
      otp,
    });
    return data;
  },
};

export default authService;
