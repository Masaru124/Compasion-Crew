import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.compassioncrew.in";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/", "/api/", "/api", "/admin", "/admin/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "Anthropic-AI",
          "Claude-Web",
          "Cohere-ai"
        ],
        allow: "/",
        disallow: ["/studio", "/studio/", "/api/", "/api", "/admin", "/admin/"],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
