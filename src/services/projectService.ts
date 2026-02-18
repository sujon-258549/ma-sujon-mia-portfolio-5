import { Project } from "@/types/project";
import { authService } from "@/lib/authService";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const projectService = {
  /**
   * Get all projects
   */
  getAllProjects: async () => {
    try {
      const response = await fetch(`${BASE_URL}/projects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["projects", "portfolio"],
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch projects");
      }

      return data.data || data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("An unexpected error occurred while fetching projects");
    }
  },

  /**
   * Get a single project by ID
   */
  getProjectById: async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["projects", "portfolio"],
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch project");
      }

      return data.data || data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("An unexpected error occurred while fetching project");
    }
  },

  /**
   * Get a single project by Slug
   */
  getProjectBySlug: async (slug: string) => {
    try {
      const response = await fetch(`${BASE_URL}/projects/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["projects", "portfolio"],
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // Fallback: try to find by slug in all projects if direct endpoint fails or if ID was expected
        // This is useful if the backend only supports ID-based lookup on this route or strict slug route separation
        try {
          const allProjects = await projectService.getAllProjects();
          const project = allProjects.find((p: Project) => p.slug === slug);
          if (project) return project;
        } catch (fallbackError) {
          console.error("Fallback lookup failed", fallbackError);
        }

        throw new Error(data.message || "Failed to fetch project");
      }

      return data.data || data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("An unexpected error occurred while fetching project");
    }
  },

  /**
   * Create a new project (Admin only)
   */
  createProject: async (projectData: Partial<Project>) => {
    try {
      const token = authService.getToken();
      if (!token) throw new Error("Authentication required");

      const response = await fetch(`${BASE_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create project");
      }

      return data.data || data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("An unexpected error occurred while creating project");
    }
  },

  /**
   * Update an existing project (Admin only)
   */
  updateProject: async (id: string, projectData: Partial<Project>) => {
    try {
      const token = authService.getToken();
      if (!token) throw new Error("Authentication required");

      const response = await fetch(`${BASE_URL}/projects/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update project");
      }

      return data.data || data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("An unexpected error occurred while updating project");
    }
  },

  /**
   * Delete a project (Admin only)
   */
  deleteProject: async (id: string) => {
    try {
      const token = authService.getToken();
      if (!token) throw new Error("Authentication required");

      const response = await fetch(`${BASE_URL}/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete project");
      }

      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("An unexpected error occurred while deleting project");
    }
  },
};
