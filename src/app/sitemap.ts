import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://campasioncrew.org";
  
  const routes = ["", "/about", "/founder", "/team", "/events", "/volunteer", "/donate"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" || route === "/events" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : route === "/donate" || route === "/events" ? 0.9 : 0.8,
  }));

  return routes;
}
