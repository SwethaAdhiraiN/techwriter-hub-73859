import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const AuthContext = createContext();

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check localStorage for token and validate it
  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } });
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  // PUBLIC_INTERFACE
  async function login(email, password) {
    setLoading(true);
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    setLoading(false);
    return res.data.user;
  }

  // PUBLIC_INTERFACE
  async function register(username, email, password) {
    setLoading(true);
    const res = await api.post("/auth/register", { username, email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    setLoading(false);
    return res.data.user;
  }

  // PUBLIC_INTERFACE
  async function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  const value = { user, login, register, logout, loading, setUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
