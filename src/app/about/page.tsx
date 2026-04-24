"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Target, Eye, Lightbulb, Users, Award, Leaf } from "lucide-react";

const milestones = [
  { year: "2018", title: "Foundation", description: "CAMPASION CREW was founded with a mission to serve every life with dignity." },
  { year: "2019", title: "First State Expansion", description: "Extended operations to 5 states across India." },
  { year: "2020", title: "Pandemic Response", description: "Served 10,000+ families during COVID-19 crisis." },
  { year: "2021", title: "Women Centers", description: "Opened 10 skill development centers for women." },
  { year: "2022", title: "Animal Shelter", description: "Established our first dedicated animal rescue center." },
  { year: "2023", title: "Education Program", description: "Launched scholarship program for underprivileged children." },
];

export default function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-[#E07B39] font-medium text-sm tracking-wider uppercase">
              About Us
            </span>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-semibold text-[#2C2416] mt-4 mb-6">
              Our Story of Compassion
            </h1>
            <p className="text-lg text-[#6B5B4F] leading-relaxed">
              CAMPASION CREW was born from a simple belief: every life—whether human 
              or animal—deserves dignity, care, and equal value. Since 2018, we have 
              been working tirelessly across India to turn this belief into reality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section ref={ref} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#2D5A3D] to-[#3D7A52] rounded-3xl p-10 text-white"
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold mb-4">
                Our Vision
              </h2>
              <p className="text-white/90 text-lg leading-relaxed">
                A world where every life is treated with dignity and compassion. 
                Where women walk with confidence, children dream without boundaries, 
                and animals live without fear.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#FCE5CD] rounded-3xl p-10"
            >
              <div className="w-14 h-14 bg-[#E07B39]/20 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-[#E07B39]" />
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2C2416] mb-4">
                Our Mission
              </h2>
              <p className="text-[#6B5B4F] text-lg leading-relaxed">
                To create sustainable change through empowerment, education, and care. 
                We work with communities, not just for them, building lasting solutions 
                that honor local wisdom and culture.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-[#E07B39] font-medium text-sm tracking-wider uppercase">
              What Guides Us
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-[#2C2416] mt-4">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: "Compassion", desc: "Every action is driven by genuine care and empathy" },
              { icon: Lightbulb, title: "Innovation", desc: "Finding creative solutions to complex challenges" },
              { icon: Users, title: "Community", desc: "Building together with those we serve" },
              { icon: Leaf, title: "Sustainability", desc: "Creating lasting change that endures" },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-[#2D5A3D]/10 rounded-2xl flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-[#2D5A3D]" />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#2C2416] mb-2">
                  {value.title}
                </h3>
                <p className="text-[#6B5B4F] text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
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
              Our Journey
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-[#2C2416] mt-4">
              Milestones of Impact
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#E5DDD3] hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1 text-center md:text-right">
                    <div className={`${index % 2 === 0 ? "md:pr-12" : "md:text-left md:pl-12"}`}>
                      <div className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#E07B39] mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-[#2C2416] mb-2">{milestone.title}</h3>
                      <p className="text-[#6B5B4F]">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-[#E07B39] rounded-full border-4 border-white shadow-lg z-10" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
