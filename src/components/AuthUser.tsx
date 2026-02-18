"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/auth";

interface AuthUserProps {
  token?: string | null;
  onUserLoad?: (user: User | null) => void;
  children?: (user: User | null, isLoading: boolean) => React.ReactNode;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const AuthUser = ({ token, onUserLoad, children }: AuthUserProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      // Use passed token OR fallback to localStorage
      const activeToken = token || localStorage.getItem("token");

      if (!activeToken) {
        setUser(null);
        setIsLoading(false);
        onUserLoad?.(null);
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            Authorization: activeToken,
          },
        });

        if (!res.ok) {
          setUser(null);
          onUserLoad?.(null);
          return;
        }

        const data = await res.json();
        const userData = data.data || data;
        setUser(userData);
        onUserLoad?.(userData);
      } catch (e) {
        console.error("Failed to fetch user:", e);
        setUser(null);
        onUserLoad?.(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [token, onUserLoad]);

  // If children is a render prop, use it
  if (children) {
    return <>{children(user, isLoading)}</>;
  }

  return null;
};

export default AuthUser;
