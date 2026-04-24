"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const workAreas = [
  {
    id: "women",
    title: "Women Empowerment",
    description: "Supporting women through education, skill development, and financial independence programs across rural India. We believe in providing the tools and resources necessary for women to build sustainable livelihoods and become leaders in their communities.",
    color: "text-secondary",
    stats: "25,000+ Women Supported",
    image: "/images/women.png",
    href: "/work/women",
  },
  {
    id: "children",
    title: "Children Welfare",
    description: "Ensuring every child has access to education, nutrition, healthcare, and a safe nurturing environment. Our comprehensive approach tackles root causes of child poverty, offering a pathway to a brighter, more secure future.",
    color: "text-primary",
    stats: "15,000+ Children Educated",
    image: "/images/child.png",
    href: "/work/children",
  },
  {
    id: "animals",
    title: "Animal Rescue",
    description: "Rescuing, rehabilitating, and providing shelter to stray and injured animals with compassion and care. We advocate for animal rights and operate mobile clinics to ensure no life is left behind in pain.",
    color: "text-accent",
    stats: "10,000+ Animals Rescued",
    image: "/images/animal.png",
    href: "/work/animals",
  },
];

export function WorkAreas() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="work" ref={containerRef} className="bg-background relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-24"
        >
          <span className="text-secondary font-medium text-sm tracking-[0.2em] uppercase">
            Our Focus Areas
          </span>
          <h2 className="font-heading text-fluid-h2 text-foreground mt-6 mb-8 tracking-tight">
            Where we make a lasting <span className="italic text-primary">impact</span>.
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 relative">
          
          {/* Left Side - Sticky Images (Desktop) */}
          <div className="hidden lg:block lg:w-1/2 relative h-[80vh] sticky top-[10vh]">
            {workAreas.map((area, index) => (
              <WorkAreaImage key={area.id} area={area} index={index} />
            ))}
          </div>

          {/* Right Side - Scrolling Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-[20vh] pb-[20vh]">
            {workAreas.map((area, index) => (
              <div 
                key={area.id} 
                className="flex flex-col justify-center min-h-[60vh] lg:min-h-0"
              >
                {/* Mobile Image */}
                <div className="block lg:hidden w-full h-[400px] relative rounded-[2rem] overflow-hidden mb-12 organic-shape">
                  <Image 
                    src={area.image} 
                    alt={area.title} 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <span className={`text-6xl font-heading font-light ${area.color} opacity-40`}>
                    0{index + 1}
                  </span>
                  <div className="h-[1px] w-12 bg-border" />
                </div>
                
                <h3 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6">
                  {area.title}
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
                  {area.description}
                </p>

                <div className="flex items-center justify-between border-t border-border pt-8 mt-auto">
                  <div className="font-medium text-foreground tracking-wide">
                    {area.stats}
                  </div>
                  <Link 
                    href="/about" 
                    className="interactive flex items-center justify-center w-14 h-14 rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
                  >
                    <ArrowUpRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkAreaImage({ area, index }: { area: typeof workAreas[0], index: number }) {
  // Using sticky positioning and intersection observer-like behavior in framer motion
  // However, since we are keeping it simple, we use a CSS sticky approach on the parent
  // and animate the images based on standard scroll behavior.
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, zIndex: 10 }}
      exit={{ opacity: 0 }}
      viewport={{ margin: "-50% 0px -50% 0px" }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 w-full h-full organic-shape overflow-hidden shadow-2xl"
    >
      <Image 
        src={area.image} 
        alt={area.title} 
        fill 
        sizes="50vw"
        className="object-cover transform hover:scale-105 transition-transform duration-1000"
      />
    </motion.div>
  );
}
