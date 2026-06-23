import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { client } from "@/sanity/client";

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
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const posts = await client.fetch(`*[_type == "post"] { "slug": slug.current, _updatedAt }`);
      if (posts && posts.length > 0) {
        blogRoutes = posts.map((post: { slug: string; _updatedAt?: string }) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
          changeFrequency: "weekly" as "daily" | "weekly" | "always" | "hourly" | "daily" | "monthly" | "yearly" | "never",
          priority: 0.7,
        }));
      }
    }
  } catch (error) {
    console.error("Failed to fetch blog post slugs for sitemap:", error);
  }

  return [...routes, ...blogRoutes];
}
