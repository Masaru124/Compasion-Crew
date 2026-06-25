"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HeroData {
  eyebrow: string;
  title: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  image: string | null | undefined;
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
  image: "/images/yoga.jpeg",
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

  const getImageUrl = (img: string | null | undefined) => {
    if (!img) return "/images/yoga.jpeg";
    if (typeof img === "string") return img;
    return "/images/yoga.jpeg";
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden planner-bg pt-32 pb-20 border-b border-border/60">
      {/* Blueprint coordinate markers & glowing orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Amber Orb */}
        <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        {/* Teal Orb */}
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-accent/8 rounded-full blur-[140px] mix-blend-screen" />
        {/* Violet Glow */}
        <div className="absolute bottom-[10%] left-[40%] w-[300px] h-[300px] bg-violet-500/5 rounded-full blur-[100px] mix-blend-screen" />
        
        {/* Technical Coordinates Grid Markers */}
        <div className="absolute top-10 left-10 font-mono text-[9px] text-muted-foreground/40">
          [CC_PLANNER_BOARD // v1.2]
        </div>
        <div className="absolute top-10 right-10 font-mono text-[9px] text-muted-foreground/40">
          SYS_LAT: 12.9716° N // LON: 77.5946° E
        </div>
      </div>

      <div className="section-container flex flex-col lg:flex-row items-center gap-12 lg:gap-20 z-10">
        <div className="flex-1 w-full max-w-xl">
          <span className="font-mono text-xs uppercase tracking-widest text-terracotta mb-4 block border-l-2 border-terracotta pl-3">
            {data.eyebrow}
          </span>

          <h1 className="font-heading text-fluid-hero text-foreground font-light tracking-tight mb-6 animate-fade-up">
            {parseTitle(data.title)}
          </h1>

          <p className="text-muted-foreground font-light mb-8 leading-relaxed max-w-lg">
            {data.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={data.primaryBtnLink}>
              <Button size="xl" className="group font-mono uppercase tracking-wider h-12">
                {data.primaryBtnText}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link href={data.secondaryBtnLink}>
              <Button variant="outline" size="xl" className="font-mono uppercase tracking-wider h-12 border-border/80 hover:bg-primary/10">
                {data.secondaryBtnText}
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full relative h-[40vh] lg:h-[55vh] max-h-[520px] min-h-[320px] group animate-scale-in">
          <div className="w-full h-full bg-card/25 backdrop-blur-md border border-border/85 p-3 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:border-primary/40 transition-colors duration-500 relative">
            <div className="w-full h-full rounded-2xl overflow-hidden relative border border-border/60">
              <Image
                src={getImageUrl(data.image)}
                alt="COMPASSION CREW (Compassion Crew) India - Helping women, children, and rescuing animals"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-750 group-hover:scale-103"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
            {/* High-tech overlay coordinate */}
            <div className="absolute bottom-6 left-6 font-mono text-[9px] bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-sm tracking-wider uppercase">
              IMAGE_SHOWCASE // 01
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
