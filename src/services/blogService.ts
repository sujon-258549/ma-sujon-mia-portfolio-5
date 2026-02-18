import { BlogPost } from "@/types/blog";
import { authService } from "@/lib/authService";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

interface BlogHeader {
  title: string;
  subtitle: string;
  description: string;
}

export const blogService = {
  /**
   * Get all blog posts
   */
  getAllPosts: async (): Promise<BlogPost[]> => {
    try {
      const response = await fetch(`${BASE_URL}/blogs`, {
        method: "GET",
        next: {
          tags: ["blogs"],
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch blogs");
      }

      return result.data || [];
    } catch (error) {
      console.error("Error fetching blogs:", error);
      // For now returning mock data if API fails to prevent white screen
      return [
        {
          id: "1",
          title: "Mastering Next.js 16 Server Components",
          excerpt:
            "Deep dive into the new era of React with Server Components and how they change the way we think about data fetching.",
          date: "Feb 15, 2026",
          image:
            "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1000&auto=format&fit=crop",
          category: "Development",
          readTime: "8 min read",
          slug: "mastering-nextjs-16",
        },
        {
          id: "2",
          title: "The Future of AI in Modern Web Apps",
          excerpt:
            "Exploring how integrated AI models are transforming user experiences from simple chatbots to complex generative interfaces.",
          date: "Feb 10, 2026",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
          category: "Technology",
          readTime: "12 min read",
          slug: "future-of-ai-web",
        },
        {
          id: "3",
          title: "Building Scalable Design Systems",
          excerpt:
            "Learn the secrets behind creating consistent and maintainable design systems that grow with your application.",
          date: "Feb 05, 2026",
          image:
            "https://images.unsplash.com/photo-1586717791821-3f44a563de4c?q=80&w=1000&auto=format&fit=crop",
          category: "Design",
          readTime: "10 min read",
          slug: "scalable-design-systems",
        },
      ];
    }
  },

  /**
   * Get blog post by slug
   */
  getPostBySlug: async (slug: string): Promise<BlogPost | null> => {
    try {
      const response = await fetch(`${BASE_URL}/blogs/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok && result.data) {
        return result.data;
      }

      // If direct fetch fails, try finding in all posts (fallthrough for slugs)
      const allPosts = await blogService.getAllPosts();
      return allPosts.find((p) => p.slug === slug) || null;
    } catch (error) {
      console.error(`Error fetching blog post ${slug}:`, error);
      // Fallback to searching in all posts (which might include mock data)
      try {
        const allPosts = await blogService.getAllPosts();
        return allPosts.find((p) => p.slug === slug) || null;
      } catch (innerError) {
        console.error("Critical fallback failure in blogService:", innerError);
        return null;
      }
    }
  },

  /**
   * Create a new blog post
   */
  createBlog: async (data: Partial<BlogPost>): Promise<BlogPost> => {
    try {
      const token = authService.getToken();
      const response = await fetch(`${BASE_URL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to create blog");
      }
      return result.data;
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  },

  /**
   * Update an existing blog post
   */
  updateBlog: async (
    id: string,
    data: Partial<BlogPost>,
  ): Promise<BlogPost> => {
    try {
      const token = authService.getToken();
      const response = await fetch(`${BASE_URL}/blogs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to update blog");
      }
      return result.data;
    } catch (error) {
      console.error("Error updating blog:", error);
      throw error;
    }
  },

  /**
   * Delete a blog post
   */
  deleteBlog: async (id: string): Promise<void> => {
    try {
      const token = authService.getToken();
      const response = await fetch(`${BASE_URL}/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      throw error;
    }
  },
  /**
   * Get blog section header data
   */
  getBlogHeader: async (): Promise<BlogHeader | null> => {
    try {
      const response = await fetch(`${BASE_URL}/blog-header`, {
        method: "GET",
        next: {
          tags: ["blog-header"],
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch blog header");
      }

      return result.data;
    } catch (error) {
      console.error("Error fetching blog header:", error);
      return null;
    }
  },

  /**
   * Update blog section header data
   */
  updateBlogHeader: async (data: BlogHeader): Promise<BlogHeader> => {
    try {
      const token = authService.getToken();
      const response = await fetch(`${BASE_URL}/blog-header`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to update blog header");
      }
      return result.data;
    } catch (error) {
      console.error("Error updating blog header:", error);
      throw error;
    }
  },
};
