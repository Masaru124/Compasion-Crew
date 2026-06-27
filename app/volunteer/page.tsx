import { db } from "@/db";
import { volunteerPage } from "@/db/schema";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Volunteer in Bangalore — Join COMPASSION CREW's Social Drives",
  description:
    "Volunteer with COMPASSION CREW in Bangalore. Support youth mentorship, expert talk events, animal welfare drives, and community awareness campaigns. Open to students and professionals.",
  keywords: [
    "volunteer Bangalore",
    "volunteer opportunities Bangalore 2026",
    "social impact volunteer India",
    "social cause volunteer",
    "community volunteering Bangalore",
    "youth mentorship volunteer",
  ],
  alternates: {
    canonical: "/volunteer",
  },
  openGraph: {
    title: "Volunteer in Bangalore — Join COMPASSION CREW's Social Drives",
    description:
      "Volunteer with COMPASSION CREW in Bangalore. Support youth mentorship, animal welfare drives, and community awareness campaigns.",
    type: "website",
    url: "https://www.compassioncrew.in/volunteer",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Volunteer with COMPASSION CREW in Bangalore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Volunteer in Bangalore — Join COMPASSION CREW's Social Drives",
    description:
      "Volunteer with COMPASSION CREW in Bangalore. Support youth mentorship, animal welfare drives, and community awareness campaigns.",
    images: ["/images/og-image.jpg"],
  },
};

export const revalidate = 60;

interface VolunteerData {
  title: string;
  description: string;
  formUrl: string;
  formHeight: number;
}

const defaultVolunteer: VolunteerData = {
  title: "Volunteer with COMPASSION CREW — Make a Real Difference in Bangalore",
  description:
    "Thank you for your interest in volunteering with us. Please complete the application form below. We will review your submission and contact shortlisted applicants.",
  formUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSeYJ4-OKlvkBQm0vSaGKHMrNWHflIMaKZQKAQxeN73b7PFoUg/viewform?embedded=true",
  formHeight: 3600,
};

export default async function VolunteerPage() {
  let volunteerData = null;

  try {
    const list = await db.select().from(volunteerPage).limit(1);
    if (list && list.length > 0) {
      volunteerData = list[0];
    }
  } catch (error) {
    console.error("Failed to fetch volunteer settings from Postgres:", error);
  }

  const data = volunteerData || defaultVolunteer;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.compassioncrew.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Volunteer Portal",
        item: "https://www.compassioncrew.in/volunteer",
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl bg-[#f8f8f8] px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="pt-32 pb-16">
        <div className="section-container mx-auto max-w-4xl text-center">
          <span className="text-terracotta mb-3 block font-mono text-xs tracking-widest uppercase">
            Get Involved
          </span>
          <h1 className="font-heading text-fluid-hero text-foreground mb-4 tracking-tight">
            {data.title}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            {data.description}
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto">
          <div className="paper-card">
            <iframe
              src={data.formUrl}
              width="100%"
              height={data.formHeight}
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              loading="lazy"
              title="Volunteer registration form for COMPASSION CREW Bangalore"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
