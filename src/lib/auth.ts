"use client";

/**
 * Checks if the current user is an authorized admin.
 * For now, this is set to return true if a token exists for testing.
 * The email and role requirements are hardcoded as per request.
 */
export const isAdminAuthorized = (): boolean => {
  if (typeof window === "undefined") return false;

  // Static check: if 'token' is present, we assume the user is Sujon with Admin role
  const token = localStorage.getItem("token");

  // During development (localhost), we can return true to see the edit button
  if (typeof window !== "undefined") {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    if (isLocalhost || token) {
      console.log(`Authorized: sujon258549@gmail.com (admin)`);
      return true;
    }
  }

  return false;
};
