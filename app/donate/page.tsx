import { DonatePageClient } from "./donate-client";
import { db } from "@/db";
import { donatePage } from "@/db/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate Online - Support Social Impact (80G Tax Benefits)",
  description: "Support COMPASSION CREW's social impact community. Sponsoring expert talks, volunteer drives, and local initiatives is tax-deductible under Section 80G.",
  keywords: ["donate to social impact", "80G tax deductible donations", "online donation", "support community Bangalore"],
  alternates: {
    canonical: "/donate",
  },
  openGraph: {
    title: "Donate Online - Support Social Impact (80G Tax Benefits) | COMPASSION CREW",
    description: "Support COMPASSION CREW's social impact community. Your contributions are tax-deductible under Section 80G.",
    type: "website",
    url: "https://www.compassioncrew.in/donate",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Donate to COMPASSION CREW",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Donate Online - Support Social Impact (80G Tax Benefits) | COMPASSION CREW",
    description: "Support COMPASSION CREW's social impact community. Your contributions are tax-deductible under Section 80G.",
    images: ["/images/og-image.jpg"],
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.compassioncrew.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Donate Portal",
        "item": "https://www.compassioncrew.in/donate"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <DonatePageClient initialDonate={donateData || undefined} />
    </>
  );
}
