import { AuthResponse, User } from "@/types/auth";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const authService = {
  /**
   * Login user with email and password
   */
  login: async (credentials: Record<string, string>): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data: AuthResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred during login");
    }
  },

  /**
   * Set authentication data to local storage
   */
  setAuthData: (token: string, user?: User) => {
    localStorage.setItem("token", token);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  },

  /**
   * Clear authentication data from local storage
   */
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  /**
   * Get stored token
   */
  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  },

  /**
   * Get stored user
   */
  getUser: () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  },
};
