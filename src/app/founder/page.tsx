import { FounderPageClient } from "./founder-client";
import { client } from "@/sanity/client";
import { founderPageQuery } from "@/sanity/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Founder - Khushi Kalpesh Joshi",
  description: "Meet Khushi Kalpesh Joshi, the Founder & Director of CAMPASION CREW. Read her journey of building a social impact community and empowering changemakers across India.",
  keywords: ["Khushi Kalpesh Joshi", "founder CAMPASION CREW", "social entrepreneur India", "community leaders Bangalore"],
};

export const revalidate = 60; // Revalidate page every 60 seconds (ISR)

export default async function FounderPage() {
  let founderData = null;

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const data = await client.fetch(founderPageQuery);
      if (data) {
        founderData = data;
      }
    }
  } catch (error) {
    console.error("Failed to fetch founder details from Sanity:", error);
  }

  return <FounderPageClient initialFounder={founderData || undefined} />;
}
