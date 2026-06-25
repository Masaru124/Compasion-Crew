"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTAData {
  title: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
}

const defaultCTA: CTAData = {
  title: "Be Part of the Change",
  description: "Every contribution—whether your time, skills, or resources—helps us continue our mission of dignity and care for every life.",
  primaryBtnText: "Donate Now",
  primaryBtnLink: "/donate",
  secondaryBtnText: "Join as Volunteer",
  secondaryBtnLink: "/volunteer",
};

interface CTASectionProps {
  initialCTA?: CTAData;
}

export function CTASection({ initialCTA }: CTASectionProps) {
  const data = initialCTA || defaultCTA;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative planner-bg border-b border-border/60 section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="group relative bg-card/25 backdrop-blur-md border border-border/80 hover:border-primary/50 rounded-3xl p-10 md:p-16 max-w-4xl mx-auto shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 text-center overflow-hidden"
        >
          {/* Coordinates Header */}
          <div className="flex justify-between items-center mb-10 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60 border-b border-border/40 pb-3">
            <span>COORD // SYS-CTA-INIT</span>
            <span className="text-terracotta font-semibold">[PROPOSAL_ACTIVE]</span>
          </div>

          <div className="w-12 h-12 mx-auto mb-6 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Heart className="w-5 h-5 text-terracotta" />
          </div>

          <h2 className="font-heading text-fluid-section text-foreground mb-4 tracking-tight font-light">
            {data.title}
          </h2>

          <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-10 leading-relaxed">
            {data.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={data.primaryBtnLink}>
              <Button size="xl" className="group font-mono uppercase tracking-wider h-12 w-full sm:w-auto">
                <Heart className="w-4 h-4 mr-2" />
                {data.primaryBtnText}
              </Button>
            </Link>
            <Link href={data.secondaryBtnLink}>
              <Button variant="outline" size="xl" className="group font-mono uppercase tracking-wider h-12 border-border/80 hover:bg-primary/10 w-full sm:w-auto">
                {data.secondaryBtnText}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
