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
};

export default authService;
