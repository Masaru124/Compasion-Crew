import { DonatePageClient } from "./donate-client";
import { client } from "@/sanity/client";
import { donatePageQuery } from "@/sanity/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate Online - Support Social Impact (80G Tax Benefits)",
  description: "Support CAMPASION CREW's social impact community. Sponsoring expert talks, volunteer drives, and local initiatives is tax-deductible under Section 80G.",
  keywords: ["donate to social impact", "80G tax deductible donations", "online donation NGO", "support community Bangalore"],
};

export const revalidate = 60; // Revalidate page every 60 seconds (ISR)

export default async function DonatePage() {
  let donateData = null;

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const data = await client.fetch(donatePageQuery);
      if (data) {
        donateData = data;
      }
    }
  } catch (error) {
    console.error("Failed to fetch donate details from Sanity:", error);
  }

  return <DonatePageClient initialDonate={donateData || undefined} />;
}
