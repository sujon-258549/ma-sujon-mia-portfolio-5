import { authService } from "@/lib/authService";
import { CreativeItem, CreativeSectionData } from "@/types/creative";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const creativeService = {
  /**
   * Get Creative Section Header (Singleton)
   */
  getHeader: async (): Promise<CreativeSectionData | null> => {
    try {
      const response = await fetch(`${BASE_URL}/creative/header`, {
        method: "GET",
        next: { tags: ["creative-header"] },
      });
      if (!response.ok) return null;
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error("Failed to fetch creative header", error);
      return null;
    }
  },

  /**
   * Update Creative Section Header
   */
  updateHeader: async (data: CreativeSectionData) => {
    const token = authService.getToken();
    const response = await fetch(`${BASE_URL}/creative/header`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  /**
   * Get All Creative Items
   */
  getItems: async (): Promise<CreativeItem[]> => {
    try {
      const response = await fetch(`${BASE_URL}/creative/items`, {
        method: "GET",
        next: { tags: ["creative-items"] },
      });
      if (!response.ok) return [];
      const json = await response.json();
      return json.data || [];
    } catch (error) {
      console.error("Failed to fetch creative items", error);
      return [];
    }
  },

  /**
   * Create New Creative Item
   */
  createItem: async (data: Omit<CreativeItem, "_id" | "id">) => {
    const token = authService.getToken();
    const response = await fetch(`${BASE_URL}/creative/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  /**
   * Update Existing Creative Item
   */
  updateItem: async (id: string, data: Partial<CreativeItem>) => {
    const token = authService.getToken();
    const response = await fetch(`${BASE_URL}/creative/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  /**
   * Delete Creative Item
   */
  deleteItem: async (id: string) => {
    const token = authService.getToken();
    const response = await fetch(`${BASE_URL}/creative/items/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.json();
  },
};
