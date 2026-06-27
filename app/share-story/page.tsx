import { ShareStoryClient } from "./share-story-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Your Story",
  description: "Share your community experience, volunteering journey, or testimonial with COMPASSION CREW.",
  keywords: ["share testimonial", "nonprofit reviews", "volunteer stories India", "COMPASSION CREW impact"],
  alternates: {
    canonical: "/share-story",
  },
  openGraph: {
    title: "Share Your Story | COMPASSION CREW",
    description: "Share your community experience, volunteering journey, or testimonial with COMPASSION CREW Bangalore.",
    type: "website",
    url: "https://www.compassioncrew.in/share-story",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Share Your Story",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Share Your Story | COMPASSION CREW",
    description: "Share your community experience, volunteering journey, or testimonial with COMPASSION CREW Bangalore.",
    images: ["/images/og-image.jpg"],
  }
};

export default function ShareStoryPage() {
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
        "name": "Share Your Story",
        "item": "https://www.compassioncrew.in/share-story"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ShareStoryClient />
    </>
  );
}
