"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/client";

interface FounderData {
  name: string;
  role: string;
  biography: string[];
  image: any;
}

const defaultFounder: FounderData = {
  name: "Khushi Kalpesh Joshi",
  role: "Founder & Director",
  biography: [
    "Khushi Kalpesh Joshi founded COMPASSION CREW in 2026 with a simple yet profound vision: to build a compassionate society where individuals are empowered to learn, serve, and create meaningful change in their communities.",
    "With a heart that beats for service, she has dedicated her life to creating platforms for connection and learning. Under her leadership, COMPASSION CREW has grown from a small initiative to a social impact movement connecting students, professionals, and leaders across India.",
    "Like many young people, we saw social issues around us—children needing support, elderly people facing loneliness, animals in need of care, and communities that could benefit from more compassion and connection. We wanted to help, but we also realized that many people who wanted to contribute didn't know where to start.",
    "What began as an idea soon became a mission: to create a platform where people could learn, connect, and take meaningful action together.",
    "We started with limited resources but a clear purpose. Instead of waiting for funding or perfect conditions, we focused on building a community. Through expert talks, community events, volunteering opportunities, and awareness initiatives, Compassion Crew aims to inspire individuals to use their time, skills, and energy to create positive change.",
    "Our journey is still in its early stages, but our vision is long-term. We believe that small acts of compassion, when multiplied by a community of committed people, can create a lasting impact.",
    "Compassion Crew is more than an organization—it's a movement built on the idea that everyone has the power to contribute, regardless of their background, experience, or resources.",
    "This is only the beginning."
  ],
  image: "/images/founders.jpeg"
};

interface FounderPageClientProps {
  initialFounder?: FounderData;
}

export function FounderPageClient({ initialFounder }: FounderPageClientProps) {
  const data = initialFounder || defaultFounder;

  const getImageUrl = (img: any) => {
    if (!img) return "/images/founders.jpeg";
    if (typeof img === "string") return img;
    if (img.asset || img._type === "image") {
      return urlFor(img).url() || "/images/founders.jpeg";
    }
    return "/images/founders.jpeg";
  };

  return (
    <div className="planner-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": data.name,
          "jobTitle": data.role,
          "worksFor": {
            "@type": "NGO",
            "name": "COMPASSION CREW",
            "url": "https://compassioncrew.in"
          },
          "description": "Social entrepreneur and Founder of COMPASSION CREW, Bangalore's social impact community. Dedicated to empowering changemakers across India.",
          "url": "https://compassioncrew.in/founder"
        }) }}
      />
      <section className="pt-32 pb-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3">
              Meet Our Founder
            </span>
            <h1 className="font-heading text-fluid-hero text-foreground tracking-tight">
              {data.name} — Founder of COMPASSION CREW
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding border-t border-border">
        <div className="section-container">
          <div className="md:flex-row flex flex-col gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-[500px]"
            >
              <div className="rounded-2xl mb-10 overflow-hidden relative aspect-square w-full border border-border/50 shadow-md">
                <Image
                  src={getImageUrl(data.image)}
                  alt={`${data.name} - Founder of COMPASSION CREW`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6 flex-1"
            >
              <div>
                <h2 className="font-heading text-xl font-medium text-foreground mb-2 tracking-tight">
                  {data.name}
                </h2>
                <p className="text-terracotta font-medium">
                  {data.role}
                </p>
              </div>

              {data.biography.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
