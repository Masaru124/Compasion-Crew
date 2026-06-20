"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { urlFor } from "@/sanity/client";

interface HeroData {
  eyebrow: string;
  title: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  image: any;
}

interface HeroSectionProps {
  initialHero?: HeroData;
}

const defaultHero: HeroData = {
  eyebrow: "Social Impact Community",
  title: "Learn. Connect. *Contribute.*",
  description: "A community that empowers people to learn, connect, and contribute through expert talks, networking events, volunteering, and social campaigns.",
  primaryBtnText: "Get Involved",
  primaryBtnLink: "/volunteer",
  secondaryBtnText: "Learn More",
  secondaryBtnLink: "/about",
  image: "/images/hero.png",
};

export function HeroSection({ initialHero }: HeroSectionProps) {
  const data = initialHero || defaultHero;

  const parseTitle = (text: string) => {
    if (!text.includes("*")) return text;
    const parts = text.split("*");
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span key={index} className="italic text-terracotta">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const getImageUrl = (img: any) => {
    if (!img) return "/images/hero.png";
    if (typeof img === "string") return img;
    if (img.asset || img._type === "image") {
      return urlFor(img).url() || "/images/hero.png";
    }
    return "/images/hero.png";
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background pt-32 pb-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-primary/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-terracotta/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="section-container flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 w-full max-w-xl">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
            {data.eyebrow}
          </span>

          <h1 className="font-heading text-fluid-hero text-foreground font-medium tracking-tight mb-6">
            {parseTitle(data.title)}
          </h1>

          <p className="text-muted-foreground font-light mb-8">
            {data.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={data.primaryBtnLink}>
              <Button size="xl" className="group">
                {data.primaryBtnText}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link href={data.secondaryBtnLink}>
              <Button variant="outline" size="xl">
                {data.secondaryBtnText}
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full relative h-[40vh] lg:h-[55vh] max-h-[520px] min-h-[320px]">
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg border border-border/50">
            <Image
              src={getImageUrl(data.image)}
              alt="CAMPASION CREW (Compassion Crew) NGO India - Helping women, children, and rescuing animals"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
