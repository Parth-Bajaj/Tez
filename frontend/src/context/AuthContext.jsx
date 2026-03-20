import { createContext, useEffect, useState } from "react";
import { loginUser, logoutUser, signupUser } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("tez-user");
    const storedToken = localStorage.getItem("tez-token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (payload) => {
    setLoading(true);
    try {
      const session = await loginUser(payload);
      setUser(session.user);
      setToken(session.token);
      localStorage.setItem("tez-user", JSON.stringify(session.user));
      localStorage.setItem("tez-token", session.token);
      return session;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (payload) => {
    setLoading(true);
    try {
      const session = await signupUser(payload);
      setUser(session.user);
      setToken(session.token);
      localStorage.setItem("tez-user", JSON.stringify(session.user));
      localStorage.setItem("tez-token", session.token);
      return session;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    logoutUser();
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user && token),
    isAdmin: user?.role === "admin",
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
