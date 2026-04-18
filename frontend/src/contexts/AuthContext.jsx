import { createContext, useState, useContext, useEffect, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("attendeaseUser");
    const token = localStorage.getItem("attendeaseToken");
    if (savedUser && token) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      // Support both old "type" field and new "role" field
      setRole(userData.role || userData.type);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = useCallback((userData, token) => {
    // Store token
    if (token) {
      localStorage.setItem("attendeaseToken", token);
    }
    // Normalize role: map "lecturer" → "teacher" for backend compat
    const normalizedRole = userData.role || userData.type;
    const userToStore = { ...userData, role: normalizedRole };

    setUser(userToStore);
    setRole(normalizedRole);
    setIsAuthenticated(true);
    localStorage.setItem("attendeaseUser", JSON.stringify(userToStore));
  }, []);

  const register = useCallback((userData, token) => {
    if (token) {
      localStorage.setItem("attendeaseToken", token);
    }
    const userToStore = { ...userData, role: "student" };
    setUser(userToStore);
    setRole("student");
    setIsAuthenticated(true);
    localStorage.setItem("attendeaseUser", JSON.stringify(userToStore));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem("attendeaseUser");
    localStorage.removeItem("attendeaseToken");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        role,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
