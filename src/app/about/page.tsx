import { AboutPageClient } from "./about-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Community & Mission",
  description: "Learn about COMPASSION CREW, a community-driven social impact organization. Discover our vision, mission, and programs empowering people to learn, connect, and contribute.",
  keywords: ["about COMPASSION CREW", "social impact community", "community building India", "changemaker networking"],
  alternates: {
    canonical: "/about",
  }
};

export default function AboutPage() {
  return <AboutPageClient />;
}
