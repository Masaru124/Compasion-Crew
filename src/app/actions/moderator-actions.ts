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

/**
 * Server action to create a new event
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

    const writeClient = getWriteClient();
    let imageAssetRef = null;

    if (imageFile && imageFile.size > 0 && typeof imageFile.arrayBuffer === "function") {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadedAsset = await writeClient.assets.upload("image", buffer, {
        filename: imageFile.name,
      });
      imageAssetRef = uploadedAsset._id;
    }

    // Upload gallery images
    const galleryAssets = [];
    for (const file of galleryFiles) {
      if (file && file.size > 0 && typeof file.arrayBuffer === "function") {
        const arrBuf = await file.arrayBuffer();
        const buffer = Buffer.from(arrBuf);
        const uploadedAsset = await writeClient.assets.upload("image", buffer, {
          filename: file.name,
        });
        galleryAssets.push({
          _type: "image",
          _key: Math.random().toString(36).substring(2, 9),
          asset: {
            _type: "reference",
            _ref: uploadedAsset._id,
          },
        });
      }
    }

    const doc: any = {
      _type: "event",
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
    };

    if (imageAssetRef) {
      doc.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAssetRef,
        },
      };
    }

    if (galleryAssets.length > 0) {
      doc.gallery = galleryAssets;
    }

    await writeClient.create(doc);
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
 * Server action to update an existing event
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

    const writeClient = getWriteClient();
    const patchData: any = {
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
    };

    if (removeExistingImage) {
      patchData.image = null;
    } else if (imageFile && imageFile.size > 0 && typeof imageFile.arrayBuffer === "function") {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadedAsset = await writeClient.assets.upload("image", buffer, {
        filename: imageFile.name,
      });
      patchData.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: uploadedAsset._id,
        },
      };
    }

    // Upload new gallery files if any
    let galleryAssets: any[] = [];
    if (!removeExistingGallery && galleryFiles.length > 0) {
      for (const file of galleryFiles) {
        if (file && file.size > 0 && typeof file.arrayBuffer === "function") {
          const arrBuf = await file.arrayBuffer();
          const buffer = Buffer.from(arrBuf);
          const uploadedAsset = await writeClient.assets.upload("image", buffer, {
            filename: file.name,
          });
          galleryAssets.push({
            _type: "image",
            _key: Math.random().toString(36).substring(2, 9),
            asset: {
              _type: "reference",
              _ref: uploadedAsset._id,
            },
          });
        }
      }
    }

    if (removeExistingGallery) {
      patchData.gallery = null;
    } else if (galleryAssets.length > 0) {
      patchData.gallery = galleryAssets;
    }

    const patchOperation = writeClient.patch(eventId).set(patchData);
    
    if (removeExistingImage) {
      patchOperation.unset(["image"]);
    }
    if (removeExistingGallery) {
      patchOperation.unset(["gallery"]);
    }
    
    await patchOperation.commit();

    revalidatePath("/events");
    revalidatePath("/register");
    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to update event:", err);
    const errorMsg = err instanceof Error ? err.message : "Failed to update event.";
    return { success: false, error: errorMsg };
  }
}

/**
 * Server action to delete an event
 */
export async function deleteEventAction(eventId: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!verifyPassword(password)) {
      return { success: false, error: "Unauthorized: Invalid password" };
    }

    const writeClient = getWriteClient();
    await writeClient.delete(eventId);

    revalidatePath("/events");
    revalidatePath("/register");
    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to delete event:", err);
    const errorMsg = err instanceof Error ? err.message : "Failed to delete event.";
    return { success: false, error: errorMsg };
  }
}
