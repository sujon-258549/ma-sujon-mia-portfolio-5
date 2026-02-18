import { cookies } from "next/headers";
import { authService } from "@/lib/authService";

export const serverAuth = {
  getUser: async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    try {
      return await authService.getServerUser(token);
    } catch (e) {
      console.error("AuthService failed on server:", e);
      return null;
    }
  },
};
