import { AboutPageClient } from "./about-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Community & Mission",
  description: "Learn about COMPASSION CREW, a community-driven social impact organization. Discover our vision, mission, and programs empowering people to learn, connect, and contribute.",
  keywords: ["about COMPASSION CREW", "social impact community", "community building India", "changemaker networking"],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Our Community & Mission | COMPASSION CREW",
    description: "Discover the vision, mission, and core values of COMPASSION CREW, Bangalore's leading social impact community.",
    type: "website",
    url: "https://www.compassioncrew.in/about",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About COMPASSION CREW",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Our Community & Mission | COMPASSION CREW",
    description: "Discover the vision, mission, and core values of COMPASSION CREW, Bangalore's leading social impact community.",
    images: ["/images/og-image.jpg"],
  }
};

export default function AboutPage() {
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
        "name": "About Us",
        "item": "https://www.compassioncrew.in/about"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutPageClient />
    </>
  );
}
