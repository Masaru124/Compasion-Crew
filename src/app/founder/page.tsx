import { FounderPageClient } from "./founder-client";
import { db } from "@/db";
import { founderPage } from "@/db/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Founder - Khushi Kalpesh Joshi",
  description: "Meet Khushi Kalpesh Joshi, the Founder & Director of COMPASSION CREW. Read her journey of building a social impact community and empowering changemakers across India.",
  keywords: ["Khushi Kalpesh Joshi", "founder COMPASSION CREW", "social entrepreneur India", "community leaders Bangalore"],
  alternates: {
    canonical: "/founder",
  }
};

export const revalidate = 60; // Revalidate page every 60 seconds (ISR)

export default async function FounderPage() {
  let founderData = null;

  try {
    const list = await db.select().from(founderPage).limit(1);
    if (list && list.length > 0) {
      founderData = list[0];
    }
  } catch (error) {
    console.error("Failed to fetch founder details from Postgres:", error);
  }

  return <FounderPageClient initialFounder={founderData || undefined} />;
}
