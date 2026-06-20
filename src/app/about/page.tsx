import { AboutPageClient } from "./about-client";
import { client } from "@/sanity/client";
import { milestonesQuery } from "@/sanity/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Community & Mission",
  description: "Learn about CAMPASION CREW, a community-driven social impact organization. Discover our vision, mission, and programs empowering people to learn, connect, and contribute.",
  keywords: ["about CAMPASION CREW", "social impact community", "community building India", "changemaker networking"],
};

export const revalidate = 60; // Revalidate page every 60 seconds (ISR)

export default async function AboutPage() {
  let milestonesData = null;

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const data = await client.fetch(milestonesQuery);
      if (data && data.length > 0) {
        milestonesData = data;
      }
    }
  } catch (error) {
    console.error("Failed to fetch milestones from Sanity:", error);
  }

  return <AboutPageClient initialMilestones={milestonesData || undefined} />;
}
