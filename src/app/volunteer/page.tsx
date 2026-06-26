import { db } from "@/db";
import { volunteerPage } from "@/db/schema";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Volunteer in Bangalore — Join COMPASSION CREW's Social Drives",
  description: "Volunteer with COMPASSION CREW in Bangalore. Support youth mentorship, expert talk events, animal welfare drives, and community awareness campaigns. Open to students and professionals.",
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
    description: "Volunteer with COMPASSION CREW in Bangalore. Support youth mentorship, animal welfare drives, and community awareness campaigns.",
    type: "website",
    url: "https://www.compassioncrew.in/volunteer",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Volunteer with COMPASSION CREW in Bangalore",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Volunteer in Bangalore — Join COMPASSION CREW's Social Drives",
    description: "Volunteer with COMPASSION CREW in Bangalore. Support youth mentorship, animal welfare drives, and community awareness campaigns.",
    images: ["/images/og-image.jpg"],
  }
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
        "name": "Volunteer Portal",
        "item": "https://www.compassioncrew.in/volunteer"
      }
    ]
  };

  return (
    <div className="planner-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="pt-32 pb-16">
        <div className="section-container max-w-4xl mx-auto text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3">
            Get Involved
          </span>
          <h1 className="font-heading text-fluid-hero text-foreground mb-4 tracking-tight">
            {data.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>
      </section>

      <section className="section-container max-w-5xl mx-auto pb-12">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { title: "What You'll Do", items: ["Mentor underprivileged children at local schools", "Help organize expert talks and community meetups", "Support animal welfare and rescue drives", "Assist with social awareness campaigns"] },
            { title: "Who Can Join", items: ["Students, professionals & retirees", "Minimum 2–4 hours/month commitment", "No prior experience required", "Any age — just bring your compassion"] },
            { title: "What You Get", items: ["Official certificate of participation", "Network with social leaders & experts", "Featured as Community Champion", "Real, measurable impact on lives"] },
          ].map((col) => (
            <div key={col.title} className="bg-card border border-border rounded shadow-sm p-6">
              <h2 className="font-heading text-lg font-medium text-foreground mb-4 tracking-tight">
                {col.title}
              </h2>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item} className="text-muted-foreground text-sm flex gap-2 items-start">
                    <span className="text-primary mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mb-4">
          Want to learn more before applying?{" "}
          <Link href="/about" className="text-primary font-medium hover:underline">
            Read about our mission
          </Link>{" "}
          or check{" "}
          <Link href="/events" className="text-primary font-medium hover:underline">
            upcoming events
          </Link>.
        </p>
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
