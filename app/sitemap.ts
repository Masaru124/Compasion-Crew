import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { db } from "@/db";
import { blogs } from "@/db/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get("host") || "www.compassioncrew.in";
  const protocol = headersList.get("x-forwarded-proto") || "https";
  const baseUrl = `${protocol}://${host}`;

  const routes = ["", "/about", "/founder", "/team", "/events", "/volunteer", "/donate", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" || route === "/events" || route === "/blog" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : route === "/donate" || route === "/events" || route === "/blog" ? 0.9 : 0.8,
  }));

  // Dynamically fetch blog posts for the sitemap
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const list = await db.select({ slug: blogs.slug, publishedAt: blogs.publishedAt }).from(blogs);
    if (list && list.length > 0) {
      blogRoutes = list.map((post: { slug: string; publishedAt?: string }) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
        changeFrequency: "weekly" as "daily" | "weekly" | "always" | "hourly" | "daily" | "monthly" | "yearly" | "never",
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch blog post slugs for sitemap from Postgres:", error);
  }

  return [...routes, ...blogRoutes];
}
