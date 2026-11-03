"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { api } from "../lib/api";

type AuthUser = {
  id: number;
  email: string;
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "openshelf.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Kiem tra phien khi tai trang
  useEffect(() => {
    const controller = new AbortController();

    api
      .get<{ user: AuthUser }>("/api/auth/me", {
        signal: controller.signal,
      })
      .then((response) => {
        if (controller.signal.aborted) return;

        setUser(response.data.user);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data.user));
      })
      .catch(() => {
        if (controller.signal.aborted) return;

        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  // Dang nhap
  async function login(email: string, password: string) {
    const response = await api.post<{ user: AuthUser }>("/api/auth/login", {
      email,
      password,
    });

    const authenticatedUser = response.data.user;

    setUser(authenticatedUser);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
  }

  // Dang xuat
  async function logout() {
    await api.post("/api/auth/logout");

    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
