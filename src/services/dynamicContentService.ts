import { authService } from "@/lib/authService";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const dynamicContentService = {
  /**
   * Upsert dynamic content
   */
  upsertContent: async (data: Record<string, unknown>) => {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error("No authorization token found. Please login as admin.");
      }

      const response = await fetch(
        `${BASE_URL}/dynamic-content/upsert-content`,
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update content");
      }

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred while updating content");
    }
  },

  /**
   * Get dynamic content by type
   */
  getContent: async (type: string) => {
    try {
      const response = await fetch(`${BASE_URL}/dynamic-content?type=${type}`, {
        method: "GET",
        next: {
          tags: ["dynamic-content"],
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch content");
      }

      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred while fetching content");
    }
  },
};
