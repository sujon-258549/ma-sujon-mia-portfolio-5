"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { User } from "@/types/auth";
import { authService } from "@/lib/authService";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const refreshUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const storedToken = authService.getToken();
      const storedUser = authService.getUser();

      if (storedToken) {
        // Optimistically set user from local storage
        if (storedUser) {
          setUser(storedUser);
          setToken(storedToken);
        }

        // background verify
        try {
          const userData = await authService.getMe();
          setUser(userData);
          setToken(storedToken);
        } catch (apiError) {
          console.error("API verification failed:", apiError);
          // Only logout if it's strictly an auth error, otherwise keep stored session
          // Assuming the API returns specific error messages or we can infer it
          if (
            apiError instanceof Error &&
            (apiError.message.includes("Unauthorized") ||
              apiError.message.includes("jwt expired") ||
              apiError.message.includes("No token"))
          ) {
            authService.logout();
            setUser(null);
            setToken(null);
          } else {
            // Keep the optimistic user state for network errors or other issues
            console.warn("Keeping stored session despite API error");
          }
        }
      } else {
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      authService.logout();
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = (newToken: string, newUser: User) => {
    authService.setAuthData(newToken, newUser);
    setToken(newToken);
    setUser(newUser);
    router.refresh();
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    router.push("/login");
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/**
 * Helper function to check if the current user is authorized as an admin.
 * This is used for simple checks outside of the React context when necessary,
 * or as a quick way to check if a token exists.
 */
export const isAdminAuthorized = () => {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("token");
  return !!token;
};

/**
 * Hook to check if the user is authorized.
 * Handles hydration to avoid mismatch warnings.
 */
export const useIsAuthorized = () => {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) return false;

  return !!user || isAdminAuthorized();
};
