import { authService } from "@/lib/authService";
import { Review } from "@/types/review";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const reviewService = {
  /**
   * Get all reviews
   */
  getAllReviews: async (): Promise<Review[]> => {
    try {
      const response = await fetch(`${BASE_URL}/reviews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["reviews"],
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch reviews");
      }

      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred while fetching reviews");
    }
  },

  /**
   * Send OTP verification code to email
   */
  sendVerificationCode: async (name: string, email: string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/reviews/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to send verification code");
      }
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error(
        "An unexpected error occurred while sending verification code",
      );
    }
  },

  /**
   * Verify OTP code for email
   */
  verifyCode: async (email: string, code: string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/reviews/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.message || "Invalid or expired verification code",
        );
      }
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("An unexpected error occurred while verifying code");
    }
  },

  /**
   * Create a new review (public - no auth required)
   */
  createReview: async (review: Omit<Review, "id">) => {
    try {
      const response = await fetch(`${BASE_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create review");
      }

      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred while creating review");
    }
  },

  /**
   * Update an existing review
   */
  updateReview: async (id: string, review: Partial<Review>) => {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error("No authorization token found");
      }

      const response = await fetch(`${BASE_URL}/reviews/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update review");
      }

      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred while updating review");
    }
  },

  /**
   * Delete a review
   */
  deleteReview: async (id: string) => {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error("No authorization token found");
      }

      const response = await fetch(`${BASE_URL}/reviews/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete review");
      }

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred while deleting review");
    }
  },
};
