const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const contactMessageService = {
  /**
   * Send a new contact message
   */
  sendMessage: async (data: {
    name: string;
    email?: string;
    phone?: string;
    subject: string;
    message: string;
  }) => {
    try {
      const response = await fetch(`${BASE_URL}/contact-messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message");
      }

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred while sending message");
    }
  },
};
