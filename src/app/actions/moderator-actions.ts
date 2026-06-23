"use strict";
"use server";

import { createClient } from "@sanity/client";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";

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

/**
 * Helper to save uploaded files locally to public/images/uploads/
 */
async function saveUploadedFile(file: File, subfolder = "uploads"): Promise<string> {
  const uploadDir = path.join(process.cwd(), "public", "images", subfolder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Clean filename: remove special characters, append timestamp
  const timestamp = Date.now();
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filename = `${timestamp}-${cleanName}`;
  const filePath = path.join(uploadDir, filename);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(filePath, buffer);

  return `/images/${subfolder}/${filename}`;
}

/**
 * Server action to get all events from database
 */
export async function getEventsAction(): Promise<any[]> {
  try {
    return await db.select().from(events);
  } catch (err) {
    console.error("Failed to fetch events from database:", err);
    return [];
  }
}

/**
 * Server action to create a new event in database
 */
export async function createEventAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const password = formData.get("password") as string;
    if (!verifyPassword(password)) {
      return { success: false, error: "Unauthorized: Invalid password" };
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const location = formData.get("location") as string;
    const category = formData.get("category") as string;
    const spots = parseInt(formData.get("spots") as string) || 0;
    const isPast = formData.get("isPast") === "true";
    const registrationOpen = formData.get("registrationOpen") === "true";
    const details = formData.get("details") as string;
    const imageFile = formData.get("image") as File | null;
    const galleryFiles = formData.getAll("gallery") as File[];

    if (!title || !description || !date || !time || !location || !category) {
      return { success: false, error: "Missing required fields." };
    }

    let imagePath: string | null = null;
    if (imageFile && imageFile.size > 0 && typeof imageFile.arrayBuffer === "function") {
      imagePath = await saveUploadedFile(imageFile);
    }

    const galleryPaths: string[] = [];
    for (const file of galleryFiles) {
      if (file && file.size > 0 && typeof file.arrayBuffer === "function") {
        const path = await saveUploadedFile(file);
        galleryPaths.push(path);
      }
    }

    const eventId = "event-" + Math.random().toString(36).substring(2, 9);
    
    await db.insert(events).values({
      id: eventId,
      title,
      description,
      date,
      time,
      location,
      category,
      spots,
      isPast,
      registrationOpen,
      details,
      image: imagePath,
      gallery: galleryPaths,
    });

    revalidatePath("/events");
    revalidatePath("/register");
    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to create event:", err);
    const errorMsg = err instanceof Error ? err.message : "Failed to create event.";
    return { success: false, error: errorMsg };
  }
}

/**
 * Server action to update an existing event in database
 */
export async function updateEventAction(eventId: string, formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const password = formData.get("password") as string;
    if (!verifyPassword(password)) {
      return { success: false, error: "Unauthorized: Invalid password" };
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const location = formData.get("location") as string;
    const category = formData.get("category") as string;
    const spots = parseInt(formData.get("spots") as string) || 0;
    const isPast = formData.get("isPast") === "true";
    const registrationOpen = formData.get("registrationOpen") === "true";
    const details = formData.get("details") as string;
    const imageFile = formData.get("image") as File | null;
    const removeExistingImage = formData.get("removeImage") === "true";
    const removeExistingGallery = formData.get("removeGallery") === "true";
    const galleryFiles = formData.getAll("gallery") as File[];

    if (!title || !description || !date || !time || !location || !category) {
      return { success: false, error: "Missing required fields." };
    }

    const existingEvents = await db.select().from(events).where(eq(events.id, eventId));
    if (existingEvents.length === 0) {
      return { success: false, error: "Event not found." };
    }
    const currentEvent = existingEvents[0];

    let imagePath = currentEvent.image;
    if (removeExistingImage) {
      imagePath = null;
    } else if (imageFile && imageFile.size > 0 && typeof imageFile.arrayBuffer === "function") {
      imagePath = await saveUploadedFile(imageFile);
    }

    let galleryPaths = currentEvent.gallery || [];
    if (removeExistingGallery) {
      galleryPaths = [];
    } else if (galleryFiles.length > 0) {
      const newPaths: string[] = [];
      for (const file of galleryFiles) {
        if (file && file.size > 0 && typeof file.arrayBuffer === "function") {
          const path = await saveUploadedFile(file);
          newPaths.push(path);
        }
      }
      if (newPaths.length > 0) {
        galleryPaths = [...galleryPaths, ...newPaths];
      }
    }

    await db.update(events).set({
      title,
      description,
      date,
      time,
      location,
      category,
      spots,
      isPast,
      registrationOpen,
      details,
      image: imagePath,
      gallery: galleryPaths,
    }).where(eq(events.id, eventId));

    revalidatePath("/events");
    revalidatePath(`/events/${eventId}`);
    revalidatePath("/register");
    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to update event:", err);
    const errorMsg = err instanceof Error ? err.message : "Failed to update event.";
    return { success: false, error: errorMsg };
  }
}

/**
 * Server action to delete an event from database
 */
export async function deleteEventAction(eventId: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!verifyPassword(password)) {
      return { success: false, error: "Unauthorized: Invalid password" };
    }

    await db.delete(events).where(eq(events.id, eventId));

    revalidatePath("/events");
    revalidatePath("/register");
    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to delete event:", err);
    const errorMsg = err instanceof Error ? err.message : "Failed to delete event.";
    return { success: false, error: errorMsg };
  }
}
