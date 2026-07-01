import { EventsPageClient } from "./events-client";
import { db } from "@/db";
import { events } from "@/db/schema";
import type { Metadata } from "next";
import { desc } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Upcoming Community Events & Expert Talks",
  description: "Join our community expert talks, networking sessions, and volunteer service drives organized by COMPASSION CREW across India.",
  keywords: ["social impact events India", "expert talks Bangalore", "networking meetups Bangalore", "volunteering drives"],
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Upcoming Community Events & Expert Talks | COMPASSION CREW",
    description: "Join our community expert talks, networking sessions, and volunteer service drives organized by COMPASSION CREW in Bangalore.",
    type: "website",
    url: "https://www.compassioncrew.in/events",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Upcoming Community Events",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Upcoming Community Events & Expert Talks | COMPASSION CREW",
    description: "Join our community expert talks, networking sessions, and volunteer service drives organized by COMPASSION CREW in Bangalore.",
    images: ["/images/og-image.jpg"],
  }
};

export const revalidate = 60; // Revalidate page every 60 seconds (ISR)

const safeParseDate = (dateStr: string) => {
  try {
    const cleanDateStr = dateStr.split("-")[0].split("to")[0].trim();
    const parsed = new Date(cleanDateStr);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split("T")[0];
    }
  } catch {
    // ignore parsing errors
  }
  return "2026-12-15";
};

export default async function EventsPage() {
  let eventsData: (typeof events.$inferSelect)[] = [];

  try {
    eventsData = await db.select().from(events).orderBy(desc(events.date));
  } catch (error) {
    console.error("Failed to fetch events from Neon DB:", error);
  }

  const schemaData = eventsData.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.description,
    "startDate": safeParseDate(event.date),
    "eventAttendanceMode": event.location.toLowerCase().includes("zoom") || event.location.toLowerCase().includes("online") 
      ? "https://schema.org/OnlineEventAttendanceMode" 
      : "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": event.location.toLowerCase().includes("zoom") || event.location.toLowerCase().includes("online")
      ? {
          "@type": "VirtualLocation",
          "url": "https://www.compassioncrew.in/events"
        }
      : {
          "@type": "Place",
          "name": event.location,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": event.location.split(",").pop()?.trim() || "India",
            "addressCountry": "IN"
          }
        },
    "organizer": {
      "@type": "Organization",
      "name": "COMPASSION CREW",
      "url": "https://www.compassioncrew.in"
    }
  }));

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
        "name": "Upcoming Events",
        "item": "https://www.compassioncrew.in/events"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <EventsPageClient initialEvents={eventsData} />
    </>
  );
}
