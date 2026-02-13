import { jwtDecode } from "jwt-decode";
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
    try {
      const decodedUser = jwtDecode<User>(token);
      // Use provided user or fallback to decoded data from token
      const userData = user || decodedUser;
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Failed to decode token:", error);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
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
  /**
   * Get current user profile from backend
   */
  getMe: async (): Promise<User> => {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("Unauthorized");
        }
        throw new Error(data.message || "Failed to fetch user profile");
      }

      // If data is wrapped in a 'data' property, extract it
      const user = data.data || data;
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(
        "An unexpected error occurred while fetching user profile",
      );
    }
  },
};
