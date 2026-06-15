"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background pt-32 pb-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-primary/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-terracotta/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="section-container flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 w-full max-w-xl">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4 block">Non-Profit Organization</span>

          <h1 className="font-heading text-fluid-hero text-foreground font-medium tracking-tight mb-6">
            Every life{" "}
            <span className="italic text-terracotta">matters.</span>
          </h1>

          <p className=" text-muted-foreground font-light mb-8">
            We believe in dignity, care, and equal value for every living being. Join our mission in supporting women, children, and animals across India.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/volunteer">
              <Button size="xl" className="group">
                Get Involved
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="xl">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full relative h-[40vh] lg:h-[55vh] max-h-[520px] min-h-[320px]">
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg border border-border/50">
            <Image
              src="/images/hero.png"
              alt="Compassion Crew Hero Image"
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
