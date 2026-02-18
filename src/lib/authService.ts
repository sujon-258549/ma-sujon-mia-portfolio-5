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
   * Set authentication data to local storage and cookie
   */
  setAuthData: (token: string, user?: User) => {
    localStorage.setItem("token", token);

    // Also set token in cookie so server components can read it
    const maxAge = 60 * 60 * 24 * 7; // 7 days
    document.cookie = `token=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;

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
    // Also clear the cookie
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
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
          Authorization: `${token}`,
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

  /**
   * Get current user profile from backend (Server Side)
   */
  getServerUser: async (token: string): Promise<User | null> => {
    try {
      if (!token) return null;

      const response = await fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) return null;

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error("Server Side Auth Error:", error);
      return null;
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<User>): Promise<User> => {
    try {
      const token = authService.getToken();
      if (!token) throw new Error("No token found");

      const response = await fetch(`${BASE_URL}/users/update-profile`, {
        method: "PATCH",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update profile");
      }

      const updatedUser = responseData.data || responseData;

      // Update local storage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Failed to update profile");
    }
  },

  /**
   * Change password
   */
  changePassword: async (
    oldPassword: string,
    newPassword: string,
  ): Promise<AuthResponse> => {
    try {
      const token = authService.getToken();
      if (!token) throw new Error("No token found");

      const response = await fetch(`${BASE_URL}/users/change-password`, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Failed to change password");
    }
  },

  /**
   * Request email update (Step 1)
   */
  requestEmailUpdate: async (
    newEmail: string,
  ): Promise<{ message: string }> => {
    try {
      const token = authService.getToken();
      if (!token) throw new Error("No token found");

      const response = await fetch(`${BASE_URL}/users/request-email-update`, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to request email update");
      }

      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Failed to request email update");
    }
  },

  /**
   * Verify email update (Step 2)
   */
  verifyEmailUpdate: async (otp: string): Promise<{ data: User }> => {
    try {
      const token = authService.getToken();
      if (!token) throw new Error("No token found");

      const response = await fetch(`${BASE_URL}/users/verify-email-update`, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify email update");
      }

      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Failed to verify email update");
    }
  },
};
