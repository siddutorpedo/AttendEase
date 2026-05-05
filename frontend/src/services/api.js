import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  console.warn("⚠️ VITE_API_URL is not defined in environment variables. API calls may fail.");
}

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// ── Request interceptor: attach JWT token ────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("attendeaseToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: handle consistent structure and errors ─────
api.interceptors.response.use(
  (res) => {
    // Return the response body (res.data) directly.
    // Our backend returns { success: true, data: ... }
    return res.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear and redirect
      localStorage.removeItem("attendeaseToken");
      localStorage.removeItem("attendeaseUser");
      
      // Prevent infinite redirect loop
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
