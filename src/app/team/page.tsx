import { TeamPageClient } from "./team-client";
import { db } from "@/db";
import { teamMembers } from "@/db/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Our Team",
  description: "Meet the community coordinators and program leaders behind COMPASSION CREW, dedicating their expertise to empower learning and connection.",
  keywords: ["COMPASSION CREW team", "community coordinators India", "social program leaders Bangalore"],
  alternates: {
    canonical: "/team",
  },
  openGraph: {
    title: "Meet Our Team | COMPASSION CREW",
    description: "Meet the dedicated team coordinators and program leaders driving COMPASSION CREW's social impact projects in Bangalore.",
    type: "website",
    url: "https://www.compassioncrew.in/team",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Meet the COMPASSION CREW Team",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Our Team | COMPASSION CREW",
    description: "Meet the dedicated team coordinators and program leaders driving COMPASSION CREW's social impact projects in Bangalore.",
    images: ["/images/og-image.jpg"],
  }
};

export const revalidate = 60; // Revalidate page every 60 seconds (ISR)

export default async function TeamPage() {
  let teamMembersData = null;

  try {
    const list = await db.select().from(teamMembers);
    if (list && list.length > 0) {
      teamMembersData = list;
    }
  } catch (error) {
    console.error("Failed to fetch team members from Postgres:", error);
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
        "name": "Our Team",
        "item": "https://www.compassioncrew.in/team"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TeamPageClient initialTeamMembers={teamMembersData || undefined} />
    </>
  );
}
