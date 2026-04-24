"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#FCE5CD]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#2D5A3D]/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-8 bg-[#E07B39]/10 rounded-full flex items-center justify-center">
            <Heart className="w-10 h-10 text-[#E07B39] fill-[#E07B39]" />
          </div>

          {/* Heading */}
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2C2416] mb-6">
            Be Part of the Change
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-[#6B5B4F] max-w-2xl mx-auto mb-10 leading-relaxed">
            Every contribution—whether your time, skills, or resources—helps us 
            continue our mission of dignity and care for every life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button className="bg-[#E07B39] hover:bg-[#C45C3E] text-white font-semibold px-10 py-7 rounded-full text-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#E07B39]/20 group">
                <Heart className="w-5 h-5 mr-2 fill-current group-hover:scale-110 transition-transform" />
                Donate Now
              </Button>
            </Link>
            <Link href="/volunteer">
              <Button className="bg-transparent border-2 border-[#2D5A3D] text-[#2D5A3D] hover:bg-[#2D5A3D] hover:text-white font-semibold px-10 py-7 rounded-full text-lg transition-all duration-300 group">
                Join as Volunteer
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 pt-8 border-t border-[#E5DDD3]"
          >
            <p className="text-sm text-[#6B5B4F] mb-4">Trusted by supporters across India</p>
            <div className="flex justify-center gap-8 text-[#2D5A3D]/40">
              <span className="text-2xl font-bold">80G Certified</span>
              <span className="text-2xl font-bold">|</span>
              <span className="text-2xl font-bold">12A Registered</span>
              <span className="text-2xl font-bold">|</span>
              <span className="text-2xl font-bold">NGO Darpan</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
