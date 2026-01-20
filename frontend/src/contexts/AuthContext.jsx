import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // 🔥 NEW
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("attendeaseUser");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setRole(userData.type); // 🔥 NEW
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setRole(userData.type); // 🔥 NEW
    setIsAuthenticated(true);
    localStorage.setItem("attendeaseUser", JSON.stringify(userData));
  };

  const register = (userData) => {
    setUser(userData);
    setRole("student"); // 🔥 Registration = student only
    setIsAuthenticated(true);
    localStorage.setItem("attendeaseUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem("attendeaseUser");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        role,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
