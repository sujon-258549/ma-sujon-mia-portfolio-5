"use server";

import { revalidateTag } from "next/cache";

/**
 * Revalidate data by tag
 */
export async function revalidateData(tag: string) {
  try {
    revalidateTag(tag);
    return { success: true };
  } catch (error) {
    console.error(`Failed to revalidate tag: ${tag}`, error);
    return { success: false, error: "Revalidation failed" };
  }
}
