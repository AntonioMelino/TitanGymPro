import React, { createContext, useContext, useEffect, useState } from "react";
import type { AuthResponse, LoginRequest } from "../types/auth";
import { login as apiLogin } from "../api/auth";

type AuthContextType = {
  user: AuthResponse | null;
  login: (payload: LoginRequest) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthResponse | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tg_auth");
      if (raw) setUser(JSON.parse(raw) as AuthResponse);
    } catch {}
  }, []);

  const login = async (payload: LoginRequest) => {
    const auth = await apiLogin(payload);
    setUser(auth);
    try {
      localStorage.setItem("tg_token", auth.token);
      localStorage.setItem("tg_auth", JSON.stringify(auth));
    } catch {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("tg_token");
      localStorage.removeItem("tg_auth");
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
