"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import Image from "next/image";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-background pt-24 pb-32"
    >
      {/* Organic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-secondary/10 organic-shape blur-3xl opacity-60" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-primary/10 organic-shape-2 blur-3xl opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        {/* Text Content */}
        <div className="flex-1 w-full flex flex-col justify-center mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8 lg:space-y-12"
            style={{ y: y2, opacity }}
          >


            <h1 className="font-heading text-fluid-h1 text-foreground font-medium tracking-tight">
              Every life <br />
              <span className="italic text-secondary">matters.</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground font-light leading-relaxed max-w-lg">
              We believe in dignity, care, and equal value for every living being.
              Join our mission in supporting women, children, and animals across India.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">


              <MagneticButton>
                <Link href="/volunteer" className="interactive">
                  <Button variant="outline" className="border-primary/20 bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground px-10 py-7 rounded-full text-lg font-medium transition-colors group">
                    Volunteer
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 w-full relative h-[60vh] lg:h-[80vh] min-h-[500px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="w-full h-full relative"
            style={{ y: y1 }}
          >
            <div className="absolute inset-0 organic-shape bg-primary/20 transform rotate-3" />
            <div className="absolute inset-0 organic-shape-2 overflow-hidden shadow-2xl">
              <Image
                src="/images/hero.png"
                alt="Compassion Crew Hero Image"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transform hover:scale-105 transition-transform duration-1000"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity }}
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-primary/20 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-secondary"
          />
        </div>
      </motion.div>
    </section>
  );
}
