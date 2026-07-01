import { DonatePageClient } from "./donate-client";
import { db } from "@/db";
import { donatePage } from "@/db/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate Online - Support Social Impact",
  description: "Support COMPASSION CREW's social impact community. Sponsor expert talks, volunteer drives, and local initiatives to empower communities in India.",
  keywords: ["donate to social impact", "support community Bangalore", "online donation", "volunteer Bangalore"],
  alternates: {
    canonical: "/donate",
  },
  openGraph: {
    title: "Donate Online - Support Social Impact | COMPASSION CREW",
    description: "Support COMPASSION CREW's social impact community. Your contributions empower youth education, women programs, and animal welfare.",
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
    title: "Donate Online - Support Social Impact | COMPASSION CREW",
    description: "Support COMPASSION CREW's social impact community. Your contributions empower youth education, women programs, and animal welfare.",
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
