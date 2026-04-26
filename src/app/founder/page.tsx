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
                  src="/images/founder.jpeg"
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
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E5DDD3]">
                <div>
                  <div className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#2D5A3D]">
                    7+
                  </div>
                  <div className="text-sm text-[#6B5B4F]">Years Leading</div>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#E07B39]">
                    50K+
                  </div>
                  <div className="text-sm text-[#6B5B4F]">Lives Impacted</div>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#2D5A3D]">
                    15+
                  </div>
                  <div className="text-sm text-[#6B5B4F]">States Reached</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Personal Story */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-10 md:p-16 shadow-sm"
          >
            <div className="w-14 h-14 bg-[#FCE5CD] rounded-xl flex items-center justify-center mb-8">
              <Quote className="w-7 h-7 text-[#E07B39]" />
            </div>

            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2C2416] mb-6">
              My Journey to Service
            </h2>

            <div className="space-y-6 text-[#6B5B4F] text-lg leading-relaxed">
              <p>
                The seed of CAMPASION CREW was planted during a visit to a village in
                Rajasthan. I saw a young girl, no older than eight, carrying water for
                kilometers while her brothers went to school. That image never left me.
              </p>

              <p>
                I realized that compassion without action is just sympathy. I wanted
                to create an organization that doesn't just provide aid, but empowers
                communities to rise above their circumstances. An organization that
                treats every woman, child, and animal with the dignity they deserve.
              </p>

              <p>
                When we started in 2018, we had nothing but hope and determination.
                Today, we have an army of volunteers, supporters, and most importantly,
                transformed lives that inspire us to do more.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-[#E5DDD3]">
              <p className="font-[family-name:var(--font-playfair)] text-xl text-[#2C2416] italic">
                &ldquo;The day we stop seeing the pain of others is the day we stop being human.
                Service is not charity—it is our responsibility.&rdquo;
              </p>
              <p className="text-[#E07B39] font-medium mt-4">— Khushi Kalpesh Joshi</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-[#E07B39] font-medium text-sm tracking-wider uppercase">
              Recognition
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-[#2C2416] mt-4">
              Awards & Honors
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: "Social Entrepreneur of the Year", org: "India Today", year: "2023" },
              { icon: Heart, title: "Humanitarian Excellence Award", org: "UNESCO India", year: "2022" },
              { icon: Users, title: "Women Leadership Award", org: "FICCI", year: "2021" },
            ].map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#FAF7F2] rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-[#2D5A3D]/10 rounded-xl flex items-center justify-center">
                  <award.icon className="w-8 h-8 text-[#2D5A3D]" />
                </div>
                <h3 className="font-semibold text-[#2C2416] mb-2">{award.title}</h3>
                <p className="text-[#6B5B4F] text-sm">{award.org}</p>
                <p className="text-[#E07B39] font-medium text-sm mt-2">{award.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
