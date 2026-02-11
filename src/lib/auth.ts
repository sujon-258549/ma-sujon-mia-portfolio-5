"use client";

/**
 * Checks if the current user is an authorized admin.
 * For now, this is set to return true if a token exists for testing.
 * The email and role requirements are hardcoded as per request.
 */
export const isAdminAuthorized = (): boolean => {
  if (typeof window === "undefined") return false;

  // Check if 'token' is present in localStorage
  const token = localStorage.getItem("token");

  if (token) {
    // In a real app, you would verify the token's validity/expiration here
    return true;
  }

  return false;
};
