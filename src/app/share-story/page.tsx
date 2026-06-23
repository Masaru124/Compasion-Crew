import { ShareStoryClient } from "./share-story-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Your Story",
  description: "Share your community experience, volunteering journey, or testimonial with COMPASSION CREW.",
  keywords: ["share testimonial", "nonprofit reviews", "volunteer stories India", "COMPASSION CREW impact"],
  alternates: {
    canonical: "/share-story",
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
