import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User, AuthResponse } from "../types/auth";
import axiosInstance from "../api/axiosInstance";
import type { AxiosError } from "axios";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Load user/token from localStorage on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // 🔑 Register
  const register = async (
    fullName: string,
    email: string,
    password: string,
    role: "user" | "admin" = "user"
  ) => {
    try {
      const { data } = await axiosInstance.post<AuthResponse>("/auth/register", {
        fullName,
        email,
        password,
        role,
      });
      handleAuthSuccess(data);
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ message: string }>;
      throw new Error(axiosErr.response?.data?.message || "Registration failed");
    }
  };

  // 🔑 Login
  const login = async (email: string, password: string) => {
    try {
      const { data } = await axiosInstance.post<AuthResponse>("/auth/login", {
        email,
        password,
      });
      handleAuthSuccess(data);
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ message: string }>;
      throw new Error(axiosErr.response?.data?.message || "Login failed");
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  // ✅ Helper: Handle successful login/register
  const handleAuthSuccess = (data: AuthResponse) => {
    const { id, fullName, email, role, token } = data;
    const userObj: User = { id, fullName, email, role };

    setUser(userObj);
    setToken(token);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userObj));
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
