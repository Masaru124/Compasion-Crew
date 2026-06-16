import { DonatePageClient } from "./donate-client";
import { client } from "@/sanity/client";
import { donatePageQuery } from "@/sanity/queries";

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
