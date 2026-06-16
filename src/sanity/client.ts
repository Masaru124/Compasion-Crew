import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2023-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  // If the source is null/undefined or project ID is missing, return a dummy url builder
  if (!source || projectId === "placeholder" || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return {
      url: () => typeof source === "string" ? source : "",
      width: () => ({
        height: () => ({
          url: () => typeof source === "string" ? source : "",
        }),
        url: () => typeof source === "string" ? source : "",
      }),
    };
  }
  return builder.image(source);
}
