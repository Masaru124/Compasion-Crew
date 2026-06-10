"use client";

import { motion } from "framer-motion";
import { Quote, Heart, Award, Users } from "lucide-react";
import Image from "next/image";

export default function FounderPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-[#E07B39] font-medium text-sm tracking-wider uppercase">
              Meet Our Founder
            </span>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-semibold text-[#2C2416] mt-4 mb-6">
              The Heart Behind Our Mission
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Founder Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden relative">
                <Image
                  src="/images/founders.jpeg"
                  alt="Khushi Kalpesh Joshi - Founder of CAMPASION CREW"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#FCE5CD] rounded-3xl -z-10" />
            </motion.div>

            {/* Founder Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-[#2C2416] mb-2">
                  Khushi Kalpesh Joshi

                </h2>
                <p className="text-[#E07B39] font-medium text-lg">Founder & Director</p>
              </div>

              <p className="text-[#6B5B4F] text-lg leading-relaxed">
                Khushi Kalpesh Joshi
                founded CAMPASION CREW in 2018 with a simple yet profound
                vision: to create a world where every life is valued equally. Her journey
                began after witnessing the struggles of marginalized communities during her
                travels across rural India.
              </p>

              <p className="text-[#6B5B4F] leading-relaxed">
                With a background in social work and a heart that beats for service, Khushi
                has dedicated her life to bridging the gap between privilege and poverty.
                Under her leadership, CAMPASION CREW has grown from a small initiative to
                a nationwide movement touching over 50,000 lives.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-6 pt-6 border-t border-[#E5DDD3] center">
                <div className= "flex flex-col items-center justify-center">
                  <div className="font-[family-name:var(--font-playfair) ] text-2xl font-bold text-[#2D5A3D]">
                    2+
                  </div>
                  <div className="text-sm text-[#6B5B4F]  ">Years Leading</div>
                </div>
                
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    
    </>
  );
}
