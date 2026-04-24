"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const stories = [
  {
    quote: "CAMPASION CREW didn't just give me skills, they gave me confidence. Today, I run my own tailoring business and support my family with dignity.",
    name: "Lakshmi Devi",
    role: "Women Empowerment Program",
    location: "Rajasthan",
    image: "women",
  },
  {
    quote: "My daughter now goes to school every day with a smile. The educational support changed not just her life, but our entire family's future.",
    name: "Mohammed Rafiq",
    role: "Children Education Program",
    location: "Kerala",
    image: "children",
  },
  {
    quote: "When they rescued my street dog friend Bruno, I saw true compassion in action. They treat every animal with the love they deserve.",
    name: "Priya Sharma",
    role: "Animal Rescue Volunteer",
    location: "Mumbai",
    image: "animals",
  },
];

export function StorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[#E07B39] font-medium text-sm tracking-wider uppercase">
            Real Stories
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold text-[#2C2416] mt-4 mb-6">
            Voices of Change
          </h2>
          <p className="text-[#6B5B4F] text-lg">
            These are not just testimonials—they are echoes of transformed lives, 
            of hope restored, and of dignity reclaimed.
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-[#FCE5CD] rounded-xl flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-[#E07B39]" />
              </div>

              {/* Quote Text */}
              <blockquote className="text-[#2C2416] text-lg leading-relaxed mb-8">
                &ldquo;{story.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-[#E5DDD3]">
                <div className="w-14 h-14 bg-gradient-to-br from-[#2D5A3D] to-[#3D7A52] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {story.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-[#2C2416]">{story.name}</div>
                  <div className="text-sm text-[#6B5B4F]">{story.role}</div>
                  <div className="text-xs text-[#E07B39] mt-1">{story.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
