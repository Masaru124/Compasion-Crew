import { DonatePageClient } from "./donate-client";
import { db } from "@/db";
import { donatePage } from "@/db/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate Online - Support Social Impact (80G Tax Benefits)",
  description: "Support COMPASSION CREW's social impact community. Sponsoring expert talks, volunteer drives, and local initiatives is tax-deductible under Section 80G.",
  keywords: ["donate to social impact", "80G tax deductible donations", "online donation NGO", "support community Bangalore"],
  alternates: {
    canonical: "/donate",
  }
};

export const revalidate = 60; // Revalidate page every 60 seconds (ISR)

export default async function DonatePage() {
  let donateData = null;

  try {
    const list = await db.select().from(donatePage).limit(1);
    if (list && list.length > 0) {
      const data = list[0];
      // Convert donationOptions string back to JSON array
      donateData = {
        ...data,
        donationOptions: JSON.parse(data.donationOptions),
      };
    }
  } catch (error) {
    console.error("Failed to fetch donate details from Postgres:", error);
  }

  return <DonatePageClient initialDonate={donateData || undefined} />;
}
