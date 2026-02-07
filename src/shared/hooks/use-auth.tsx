"use client";

import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { SessionData } from "@/shared/libs/session";

interface AuthContextType {
  user: SessionData | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  updateProfile: (fullName: string) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth");
      const data = await res.json();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const login = useCallback(
    async (username: string, password: string): Promise<string | null> => {
      try {
        const res = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          return data.error || "Login gagal";
        }

        setUser(data);
        return null;
      } catch {
        return "Terjadi kesalahan";
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setUser({ isLoggedIn: false, username: "", fullName: "" });
  }, []);

  const updateProfile = useCallback(
    async (fullName: string): Promise<string | null> => {
      try {
        const res = await fetch("/api/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName }),
        });

        const data = await res.json();

        if (!res.ok) {
          return data.error || "Gagal update profil";
        }

        setUser(data);
        return null;
      } catch {
        return "Terjadi kesalahan";
      }
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
