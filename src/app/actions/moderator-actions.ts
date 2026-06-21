"use strict";
"use server";

import { createClient } from "@sanity/client";
import { revalidatePath } from "next/cache";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

// Initialize write client dynamically
function getWriteClient() {
  if (!projectId || !token) {
    throw new Error("Sanity write credentials missing in environment variables.");
  }
  return createClient({
    projectId,
    dataset,
    apiVersion: "2023-01-01",
    token,
    useCdn: false,
  });
}

/**
 * Checks if the password provided matches the configured ADMIN_PASSWORD
 */
function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin";
  return password === adminPassword;
}

/**
 * Server action to verify admin password
 */
export async function verifyAdminPasswordAction(password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const isValid = verifyPassword(password);
    if (!isValid) {
      return { success: false, error: "Invalid password" };
    }
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "An unexpected error occurred.";
    return { success: false, error: errorMsg };
  }
}

/**
 * Server action for users to submit a new story
 */
export async function submitStoryAction(formData: {
  quote: string;
  name: string;
  role: string;
  location: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { quote, name, role, location } = formData;
    if (!quote || !name || !role || !location) {
      return { success: false, error: "All fields are required." };
    }

    const writeClient = getWriteClient();
    await writeClient.create({
      _type: "story",
      quote,
      name,
      role,
      location,
      approved: false, // Hidden by default until approved
    });

    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to submit story:", err);
    const errorMsg = err instanceof Error ? err.message : "Failed to submit. Please try again.";
    return { success: false, error: errorMsg };
  }
}

/**
 * Server action for admins to toggle the approved status of a story
 */
export async function toggleApproveStoryAction(
  storyId: string,
  currentStatus: boolean,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!verifyPassword(password)) {
      return { success: false, error: "Unauthorized: Invalid password" };
    }

    const writeClient = getWriteClient();
    await writeClient
      .patch(storyId)
      .set({ approved: !currentStatus })
      .commit();

    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to toggle story approval:", err);
    const errorMsg = err instanceof Error ? err.message : "Failed to update status.";
    return { success: false, error: errorMsg };
  }
}

/**
 * Server action for admins to delete a story
 */
export async function deleteStoryAction(
  storyId: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!verifyPassword(password)) {
      return { success: false, error: "Unauthorized: Invalid password" };
    }

    const writeClient = getWriteClient();
    await writeClient.delete(storyId);

    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to delete story:", err);
    const errorMsg = err instanceof Error ? err.message : "Failed to delete story.";
    return { success: false, error: errorMsg };
  }
}
