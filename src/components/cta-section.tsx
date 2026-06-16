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
    <section ref={ref} className="section-padding bg-muted/30 relative">
      <div className="section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-12 mx-auto mb-6 bg-primary/5 rounded flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary" />
          </div>

          <h2 className="font-heading text-fluid-section text-foreground mb-4 tracking-tight">
            {data.title}
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            {data.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={data.primaryBtnLink}>
              <Button variant="accent" size="xl" className="group">
                <Heart className="w-5 h-5 mr-2" />
                {data.primaryBtnText}
              </Button>
            </Link>
            <Link href={data.secondaryBtnLink}>
              <Button variant="outline" className="group">
                {data.secondaryBtnText}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
