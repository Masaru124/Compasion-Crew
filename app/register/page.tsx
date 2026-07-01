import { RegisterClient } from "./register-client";
import { db } from "@/db";
import { events } from "@/db/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Registration - Secure Your Spot",
  description: "Register for COMPASSION CREW upcoming community events, expert talks, workshops, and volunteer activities across India.",
  keywords: ["community event registration", "expert talk sign up India", "volunteer service signup"],
  alternates: {
    canonical: "/register",
  },
  openGraph: {
    title: "Event Registration - Secure Your Spot | COMPASSION CREW",
    description: "Register for COMPASSION CREW's upcoming community events, expert talks, and volunteer activities in Bangalore.",
    type: "website",
    url: "https://www.compassioncrew.in/register",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Event Registration",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Registration - Secure Your Spot | COMPASSION CREW",
    description: "Register for COMPASSION CREW's upcoming community events, expert talks, and volunteer activities in Bangalore.",
    images: ["/images/og-image.jpg"],
  }
};

export default async function RegisterPage() {
  let eventsData: (typeof events.$inferSelect)[] = [];
  
  try {
    const list = await db.select().from(events);
    // Filter to upcoming events where registration is open
    eventsData = list.filter((e) => !e.isPast && e.registrationOpen !== false);
  } catch (error) {
    console.error("Failed to fetch upcoming events for registration:", error);
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
        "name": "Event Registration",
        "item": "https://www.compassioncrew.in/register"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RegisterClient initialEvents={eventsData} />
    </>
  );
}
