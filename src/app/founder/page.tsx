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
  },
  openGraph: {
    title: "Our Founder - Khushi Kalpesh Joshi | COMPASSION CREW",
    description: "Meet Khushi Kalpesh Joshi, the Founder & Director of COMPASSION CREW. Discover her vision and journey in building a social impact community.",
    type: "profile",
    url: "https://www.compassioncrew.in/founder",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Khushi Kalpesh Joshi - Founder of COMPASSION CREW",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Founder - Khushi Kalpesh Joshi | COMPASSION CREW",
    description: "Meet Khushi Kalpesh Joshi, the Founder & Director of COMPASSION CREW. Discover her vision and journey in building a social impact community.",
    images: ["/images/og-image.jpg"],
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

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Khushi Kalpesh Joshi",
    "jobTitle": "Founder & Director",
    "worksFor": {
      "@type": "Organization",
      "name": "COMPASSION CREW",
      "url": "https://www.compassioncrew.in"
    },
    "description": "Founder of COMPASSION CREW, Bangalore-based social impact community driving volunteering, animal welfare, and youth mentorship.",
    "url": "https://www.compassioncrew.in/founder",
    "image": founderData?.image ? `https://www.compassioncrew.in${founderData.image}` : "https://www.compassioncrew.in/images/og-image.jpg"
  };

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
        "name": "Our Founder",
        "item": "https://www.compassioncrew.in/founder"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FounderPageClient initialFounder={founderData || undefined} />
    </>
  );
}
