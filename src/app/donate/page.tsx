"use client";

import { motion } from "framer-motion";
import { Heart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const donationOptions = [
  { amount: 500, impact: "Provides educational materials for 5 children" },
  { amount: 1000, impact: "Supports skill training for 2 women" },
  { amount: 2500, impact: "Feeds and cares for 5 rescued animals for a month" },
  { amount: 5000, impact: "Sponsors a child's education for 3 months" },
];

export default function DonatePage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 mx-auto mb-6 bg-[#E07B39]/10 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-[#E07B39] fill-[#E07B39]" />
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-semibold text-[#2C2416] mb-6">
              Support Our Mission
            </h1>
            <p className="text-lg text-[#6B5B4F] leading-relaxed">
              Your contribution helps us continue our work of empowering women, 
              educating children, and caring for animals across India.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Donation Options */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2C2416] mb-8">
                Choose Your Impact
              </h2>
              <div className="space-y-4">
                {donationOptions.map((option) => (
                  <button
                    key={option.amount}
                    className="w-full bg-[#FAF7F2] hover:bg-[#FCE5CD] border-2 border-transparent hover:border-[#E07B39] rounded-2xl p-6 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2D5A3D]">
                        ₹{option.amount.toLocaleString()}
                      </span>
                      <CheckCircle className="w-6 h-6 text-[#E07B39] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-[#6B5B4F]">{option.impact}</p>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Custom Amount */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#2D5A3D] rounded-3xl p-8 text-white"
            >
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold mb-4">
                Custom Amount
              </h3>
              <p className="text-white/80 mb-6">
                Enter any amount you wish to contribute. Every rupee counts towards 
                creating a better world.
              </p>
              <div className="space-y-4">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg">₹</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full pl-10 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-[#F4A261]"
                  />
                </div>
                <Button className="w-full bg-[#E07B39] hover:bg-[#C45C3E] text-white font-semibold py-6 rounded-xl text-base">
                  <Heart className="w-5 h-5 mr-2 fill-current" />
                  Donate Now
                </Button>
              </div>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-white/60">
                  All donations are tax-deductible under Section 80G. 
                  You will receive a receipt via email.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
