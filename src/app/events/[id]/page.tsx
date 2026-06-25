import { db } from "@/db";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";
import { EventDetailClient } from "./event-detail-client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface EventPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const list = await db.select({ id: events.id }).from(events);
    return list.map((ev) => ({
      id: ev.id,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams for events:", error);
    return [];
  }
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id } = await params;
  let event = null;

  try {
    const list = await db.select().from(events).where(eq(events.id, id));
    if (list.length > 0) {
      event = list[0];
    }
  } catch {
    console.error("Error fetching metadata for event page");
  }

  if (!event) {
    return {
      title: "Event Details | COMPASSION CREW",
    };
  }

  const title = `${event.title} | Event Details`;
  const description = event.description || "Join this community event organized by COMPASSION CREW.";

  return {
    title,
    description,
    alternates: {
      canonical: `/events/${id}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://www.compassioncrew.in/events/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { id } = await params;
  let event = null;

  try {
    const list = await db.select().from(events).where(eq(events.id, id));
    if (list.length > 0) {
      event = list[0];
    }
  } catch (error) {
    console.error("Error fetching event details from Neon DB:", error);
  }

  if (!event) {
    notFound();
  }

  const safeParseDate = (dateStr: string) => {
    try {
      const parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString().split("T")[0];
      }
    } catch {
      // ignore
    }
    return "2026-12-15";
  };

  const schemaData = {
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
        "name": "Events",
        "item": "https://www.compassioncrew.in/events"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": event.title,
        "item": `https://www.compassioncrew.in/events/${id}`
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
      <EventDetailClient event={event} />
    </>
  );
}
