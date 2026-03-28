"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type {
  AuthStatus,
  AuthUser,
  LoginInput,
  RegisterInput,
} from "@/lib/auth-types";

type AuthContextValue = {
  user: AuthUser | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<AuthUser | null>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<AuthUser | null>;
  register: (input: RegisterInput) => Promise<AuthUser | null>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type ApiError = {
  error?: string;
};

async function parseJson<T>(response: Response) {
  try {
    return (await response.json()) as T;
  } catch {
    return {} as T;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  async function refreshUser() {
    try {
      const response = await fetch("/api/auth/me", {
        cache: "no-store",
        credentials: "same-origin",
      });

      if (!response.ok) {
        setUser(null);
        setStatus("unauthenticated");
        return null;
      }

      const nextUser = await parseJson<AuthUser>(response);
      setUser(nextUser);
      setStatus("authenticated");
      return nextUser;
    } catch {
      setUser(null);
      setStatus("unauthenticated");
      return null;
    }
  }

  async function submitAuthRequest(
    path: "/api/auth/login" | "/api/auth/register",
    input: LoginInput | RegisterInput,
    fallback: string,
  ) {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(input),
    });

    const payload = await parseJson<ApiError>(response);

    if (!response.ok) {
      throw new Error(payload.error ?? fallback);
    }

    return refreshUser();
  }

  async function login(input: LoginInput) {
    return submitAuthRequest("/api/auth/login", input, "Login failed");
  }

  async function register(input: RegisterInput) {
    return submitAuthRequest(
      "/api/auth/register",
      input,
      "Registration failed",
    );
  }

  async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    } finally {
      setUser(null);
      setStatus("unauthenticated");
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
          credentials: "same-origin",
        });

        if (!isMounted) {
          return;
        }

        if (!response.ok) {
          setUser(null);
          setStatus("unauthenticated");
          return;
        }

        const nextUser = await parseJson<AuthUser>(response);

        if (!isMounted) {
          return;
        }

        setUser(nextUser);
        setStatus("authenticated");
      } catch {
        if (!isMounted) {
          return;
        }

        setUser(null);
        setStatus("unauthenticated");
      }
    }

    void loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        isAuthenticated: status === "authenticated" && Boolean(user),
        login,
        logout,
        refreshUser,
        register,
      }}
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
