// src/context/AuthContext.tsx
/*import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, register as apiRegister, me, logout as apiLogout } from "../api/authApi";
import { getToken } from "../utils/token";
import type { ReactNode} from "react";

type AuthContextType = {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (!getToken()) {
        setLoading(false);
        return;
      }
      try {
        const u = await me();
        setUser(u);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiLogin({ email, password });
    setUser(res.user);
  };

  const register = async (name: string, email: string, password: string, role = "tester") => {
    const res = await apiRegister({ name, email, password, role });
    setUser(res.user);
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}*/
// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type User = { id: string; name: string; email: string } | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Mock "me" behavior: check localStorage for a user
  useEffect(() => {
    const stored = localStorage.getItem("mockUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    // `_password` intentionally unused in mock mode
    const mockUser = { id: "1", name: "Demo User", email };
    setUser(mockUser);
    localStorage.setItem("mockUser", JSON.stringify(mockUser));
  };

  const register = async (
    name: string,
    email: string,
    _password: string,
    _role = "tester"
  ) => {
    // `_password` and `_role` intentionally unused in mock mode
    const mockUser = { id: "1", name, email };
    setUser(mockUser);
    localStorage.setItem("mockUser", JSON.stringify(mockUser));
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("mockUser");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

