"use strict";
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { events, stories, blogs, teamMembers } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { storySubmitLimiter } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

// ─── Auth Helper ────────────────────────────────────────────────────────────

/**
 * Verifies the current user has a valid admin session.
 * Throws an error if unauthenticated — call at the top of every admin action.
 */
async function requireAdmin(): Promise<void> {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
}

/**
 * Get client IP address from request headers for rate limiting.
 */
async function getClientIP(): Promise<string> {
  const hdrs = await headers();
  return (
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    hdrs.get("x-real-ip") ||
    "unknown"
  );
}

// ─── Validation Schemas ─────────────────────────────────────────────────────

const storySchema = z.object({
  quote: z.string().min(1, "Quote is required").max(2000, "Quote is too long (max 2000 characters)"),
  name: z.string().min(1, "Name is required").max(100, "Name is too long (max 100 characters)"),
  role: z.string().min(1, "Role is required").max(100, "Role is too long (max 100 characters)"),
  location: z.string().min(1, "Location is required").max(100, "Location is too long (max 100 characters)"),
});

const eventFieldsSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  description: z.string().min(1, "Description is required").max(2000, "Description is too long"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(1, "Location is required").max(300, "Location is too long"),
  category: z.string().min(1, "Category is required").max(100, "Category is too long"),
  details: z.string().max(10000, "Details are too long").optional().default(""),
});

// ─── File Upload Security ───────────────────────────────────────────────────

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

// Magic byte signatures for image formats
const MAGIC_BYTES: { type: string; bytes: number[] }[] = [
  { type: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
  { type: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47] },
  { type: "image/gif", bytes: [0x47, 0x49, 0x46] },
  { type: "image/webp", bytes: [0x52, 0x49, 0x46, 0x46] }, // RIFF header
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per file

/**
 * Validates and saves an uploaded file securely.
 * - Validates file extension, MIME type, and magic bytes
 * - Enforces per-file size limit
 * - Generates a cryptographically random filename
 */
async function saveUploadedFile(file: File, subfolder = "uploads"): Promise<string> {
  // 1. Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
  }

  // 2. Validate file extension
  const originalName = file.name || "unknown";
  const ext = path.extname(originalName).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new Error(`File type not allowed. Accepted: ${[...ALLOWED_EXTENSIONS].join(", ")}`);
  }

  // 3. Validate MIME type
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error(`Invalid file type: ${file.type}. Only images are accepted.`);
  }

  // 4. Read file content and validate magic bytes
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileBytes = Array.from(buffer.subarray(0, 8));

  const matchesMagic = MAGIC_BYTES.some((magic) =>
    magic.bytes.every((byte, i) => fileBytes[i] === byte)
  );

  if (!matchesMagic) {
    throw new Error("File content does not match a valid image format.");
  }

  // 5. Generate secure random filename (no user-controlled data in the path)
  const uploadDir = path.join(process.cwd(), "public", "images", subfolder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const randomId = crypto.randomUUID();
  const safeFilename = `${randomId}${ext}`;
  const filePath = path.join(uploadDir, safeFilename);

  // 6. Write file
  fs.writeFileSync(filePath, buffer);

  return `/images/${subfolder}/${safeFilename}`;
}

// ─── Public Actions ─────────────────────────────────────────────────────────

/**
 * Server action for users to submit a new story.
 * Rate-limited and input-validated. No authentication required.
 */
export async function submitStoryAction(formData: {
  quote: string;
  name: string;
  role: string;
  location: string;
  honeypot?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    // Honeypot check — if the hidden field has a value, it's a bot
    if (formData.honeypot) {
      // Silently succeed to not reveal detection
      return { success: true };
    }

    // Rate limiting
    const ip = await getClientIP();
    const rateLimitResult = storySubmitLimiter.check(ip);
    if (rateLimitResult.limited) {
      const minutes = Math.ceil((rateLimitResult.retryAfterMs || 0) / 60000);
      return {
        success: false,
        error: `Too many submissions. Please try again in ${minutes} minute(s).`,
      };
    }

    // Validate input
    const parsed = storySchema.safeParse(formData);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input.";
      return { success: false, error: firstError };
    }

    const { quote, name, role, location } = parsed.data;

    await db.insert(stories).values({
      id: "story-" + crypto.randomUUID().replace(/-/g, "").substring(0, 12),
      quote,
      name,
      role,
      location,
      approved: false,
    });

    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to submit story:", err);
    return { success: false, error: "Failed to submit. Please try again." };
  }
}

// ─── Admin Actions (Session-Protected) ──────────────────────────────────────

/**
 * Server action to get all events from database.
 * Requires admin session.
 */
export async function getEventsAction(): Promise<(typeof events.$inferSelect)[]> {
  try {
    await requireAdmin();
    return await db.select().from(events);
  } catch (err) {
    console.error("Failed to fetch events from database:", err);
    return [];
  }
}

/**
 * Server action to get all stories from database.
 * Requires admin session.
 */
export async function getStoriesAction(): Promise<(typeof stories.$inferSelect)[]> {
  try {
    await requireAdmin();
    return await db.select().from(stories);
  } catch (err) {
    console.error("Failed to fetch stories from database:", err);
    return [];
  }
}

/**
 * Server action for admins to toggle the approved status of a story.
 */
export async function toggleApproveStoryAction(
  storyId: string,
  currentStatus: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin();

    await db.update(stories)
      .set({ approved: !currentStatus })
      .where(eq(stories.id, storyId));

    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to toggle story approval:", err);
    return { success: false, error: "Failed to update status." };
  }
}

/**
 * Server action for admins to delete a story.
 */
export async function deleteStoryAction(
  storyId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin();

    await db.delete(stories).where(eq(stories.id, storyId));

    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to delete story:", err);
    return { success: false, error: "Failed to delete story." };
  }
}

/**
 * Server action to create a new event in database.
 */
export async function createEventAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const location = formData.get("location") as string;
    const category = formData.get("category") as string;
    const spots = parseInt(formData.get("spots") as string) || 0;
    const isPast = formData.get("isPast") === "true";
    const registrationOpen = formData.get("registrationOpen") === "true";
    const details = (formData.get("details") as string) || "";
    const imageFile = formData.get("image") as File | null;
    const galleryFiles = formData.getAll("gallery") as File[];

    // Validate required fields
    const parsed = eventFieldsSchema.safeParse({ title, description, date, time, location, category, details });
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input.";
      return { success: false, error: firstError };
    }

    let imagePath: string | null = null;
    if (imageFile && imageFile.size > 0 && typeof imageFile.arrayBuffer === "function") {
      imagePath = await saveUploadedFile(imageFile);
    }

    const galleryPaths: string[] = [];
    for (const file of galleryFiles) {
      if (file && file.size > 0 && typeof file.arrayBuffer === "function") {
        const savedPath = await saveUploadedFile(file);
        galleryPaths.push(savedPath);
      }
    }

    const eventId = "event-" + crypto.randomUUID().replace(/-/g, "").substring(0, 12);

    await db.insert(events).values({
      id: eventId,
      title: parsed.data.title,
      description: parsed.data.description,
      date: parsed.data.date,
      time: parsed.data.time,
      location: parsed.data.location,
      category: parsed.data.category,
      spots,
      isPast,
      registrationOpen,
      details: parsed.data.details,
      image: imagePath,
      gallery: galleryPaths,
    });

    revalidatePath("/events");
    revalidatePath("/register");
    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to create event:", err);
    return { success: false, error: "Failed to create event." };
  }
}

/**
 * Server action to update an existing event in database.
 */
export async function updateEventAction(eventId: string, formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const location = formData.get("location") as string;
    const category = formData.get("category") as string;
    const spots = parseInt(formData.get("spots") as string) || 0;
    const isPast = formData.get("isPast") === "true";
    const registrationOpen = formData.get("registrationOpen") === "true";
    const details = (formData.get("details") as string) || "";
    const imageFile = formData.get("image") as File | null;
    const removeExistingImage = formData.get("removeImage") === "true";
    const removeExistingGallery = formData.get("removeGallery") === "true";
    const galleryFiles = formData.getAll("gallery") as File[];

    // Validate required fields
    const parsed = eventFieldsSchema.safeParse({ title, description, date, time, location, category, details });
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input.";
      return { success: false, error: firstError };
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
          const savedPath = await saveUploadedFile(file);
          newPaths.push(savedPath);
        }
      }
      if (newPaths.length > 0) {
        galleryPaths = [...galleryPaths, ...newPaths];
      }
    }

    await db.update(events).set({
      title: parsed.data.title,
      description: parsed.data.description,
      date: parsed.data.date,
      time: parsed.data.time,
      location: parsed.data.location,
      category: parsed.data.category,
      spots,
      isPast,
      registrationOpen,
      details: parsed.data.details,
      image: imagePath,
      gallery: galleryPaths,
    }).where(eq(events.id, eventId));

    revalidatePath("/events");
    revalidatePath(`/events/${eventId}`);
    revalidatePath("/register");
    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to update event:", err);
    return { success: false, error: "Failed to update event." };
  }
}

/**
 * Server action to delete an event from database.
 */
export async function deleteEventAction(eventId: string): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin();

    await db.delete(events).where(eq(events.id, eventId));

    revalidatePath("/events");
    revalidatePath("/register");
    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to delete event:", err);
    return { success: false, error: "Failed to delete event." };
  }
}

/**
 * Server action to get all blogs from database.
 * Requires admin session.
 */
export async function getBlogsAction(): Promise<(typeof blogs.$inferSelect)[]> {
  try {
    await requireAdmin();
    return await db.select().from(blogs).orderBy(desc(blogs.publishedAt));
  } catch (err) {
    console.error("Failed to fetch blogs from database:", err);
    return [];
  }
}

/**
 * Server action to get all team members from database.
 * Requires admin session.
 */
export async function getTeamMembersAction(): Promise<(typeof teamMembers.$inferSelect)[]> {
  try {
    await requireAdmin();
    return await db.select().from(teamMembers);
  } catch (err) {
    console.error("Failed to fetch team members from database:", err);
    return [];
  }
}

/**
 * Server action to create a new blog in database.
 * Requires admin session.
 */
export async function createBlogAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin();

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const excerpt = formData.get("excerpt") as string;
    const bodyContent = formData.get("body") as string;
    const authorName = formData.get("authorName") as string;
    const authorRole = formData.get("authorRole") as string;
    const authorBio = formData.get("authorBio") as string;
    const authorEmail = formData.get("authorEmail") as string;
    const seoTitle = formData.get("seoTitle") as string;
    const seoDescription = formData.get("seoDescription") as string;
    const keywordsStr = formData.get("keywords") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !slug || !bodyContent) {
      return { success: false, error: "Title, Slug, and Body Content are required." };
    }

    const existing = await db.select().from(blogs).where(eq(blogs.slug, slug));
    if (existing.length > 0) {
      return { success: false, error: "A blog with this slug already exists." };
    }

    let mainImagePath: string | null = null;
    if (imageFile && imageFile.size > 0 && typeof imageFile.arrayBuffer === "function") {
      mainImagePath = await saveUploadedFile(imageFile, "blogs");
    }

    const paragraphs = bodyContent.split(/\r?\n\r?\n+/).map(p => p.trim()).filter(Boolean);
    const bodyBlocks = paragraphs.map(p => ({
      _type: "block",
      style: "normal",
      children: [{ _type: "span", text: p }]
    }));
    const bodyJson = JSON.stringify(bodyBlocks);

    const keywords = keywordsStr
      ? keywordsStr.split(",").map(k => k.trim()).filter(Boolean)
      : [];

    const blogId = "blog-" + crypto.randomUUID().replace(/-/g, "").substring(0, 12);

    await db.insert(blogs).values({
      id: blogId,
      title,
      slug,
      publishedAt: new Date().toISOString(),
      category,
      excerpt,
      body: bodyJson,
      mainImage: mainImagePath,
      authorName,
      authorRole,
      authorBio,
      authorEmail,
      seoTitle,
      seoDescription,
      keywords,
    });

    revalidatePath("/blog");
    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to create blog post:", err);
    return { success: false, error: "Failed to create blog post." };
  }
}

/**
 * Server action to update an existing blog in database.
 * Requires admin session.
 */
export async function updateBlogAction(blogId: string, formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin();

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const excerpt = formData.get("excerpt") as string;
    const bodyContent = formData.get("body") as string;
    const authorName = formData.get("authorName") as string;
    const authorRole = formData.get("authorRole") as string;
    const authorBio = formData.get("authorBio") as string;
    const authorEmail = formData.get("authorEmail") as string;
    const seoTitle = formData.get("seoTitle") as string;
    const seoDescription = formData.get("seoDescription") as string;
    const keywordsStr = formData.get("keywords") as string;
    const imageFile = formData.get("image") as File | null;
    const removeExistingImage = formData.get("removeImage") === "true";

    if (!title || !slug || !bodyContent) {
      return { success: false, error: "Title, Slug, and Body Content are required." };
    }

    const existing = await db.select().from(blogs).where(eq(blogs.slug, slug));
    const otherBlogsWithSlug = existing.filter(b => b.id !== blogId);
    if (otherBlogsWithSlug.length > 0) {
      return { success: false, error: "A blog with this slug already exists." };
    }

    const currentBlogs = await db.select().from(blogs).where(eq(blogs.id, blogId));
    if (currentBlogs.length === 0) {
      return { success: false, error: "Blog post not found." };
    }
    const currentBlog = currentBlogs[0];

    let mainImagePath = currentBlog.mainImage;
    if (removeExistingImage) {
      mainImagePath = null;
    } else if (imageFile && imageFile.size > 0 && typeof imageFile.arrayBuffer === "function") {
      mainImagePath = await saveUploadedFile(imageFile, "blogs");
    }

    const paragraphs = bodyContent.split(/\r?\n\r?\n+/).map(p => p.trim()).filter(Boolean);
    const bodyBlocks = paragraphs.map(p => ({
      _type: "block",
      style: "normal",
      children: [{ _type: "span", text: p }]
    }));
    const bodyJson = JSON.stringify(bodyBlocks);

    const keywords = keywordsStr
      ? keywordsStr.split(",").map(k => k.trim()).filter(Boolean)
      : [];

    await db.update(blogs).set({
      title,
      slug,
      category,
      excerpt,
      body: bodyJson,
      mainImage: mainImagePath,
      authorName,
      authorRole,
      authorBio,
      authorEmail,
      seoTitle,
      seoDescription,
      keywords,
    }).where(eq(blogs.id, blogId));

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to update blog post:", err);
    return { success: false, error: "Failed to update blog post." };
  }
}

/**
 * Server action to delete an existing blog post from database.
 * Requires admin session.
 */
export async function deleteBlogAction(blogId: string): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin();

    await db.delete(blogs).where(eq(blogs.id, blogId));

    revalidatePath("/blog");
    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to delete blog post:", err);
    return { success: false, error: "Failed to delete blog post." };
  }
}
