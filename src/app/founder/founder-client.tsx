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
    "Khushi Kalpesh Joshi founded CAMPASION CREW in 2018 with a simple yet profound vision: to create a world where every life is valued equally. Her journey began after witnessing the struggles of marginalized communities during her travels across rural India.",
    "With a background in social work and a heart that beats for service, Khushi has dedicated her life to bridging the gap between privilege and poverty. Under her leadership, CAMPASION CREW has grown from a small initiative to a nationwide movement touching over 50,000 lives."
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
              The Heart Behind Our Mission
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
                  alt={`${data.name} - Founder of CAMPASION CREW`}
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
