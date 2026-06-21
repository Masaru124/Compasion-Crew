import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://compassioncrew.in";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/studio/", "/api/", "/api"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
