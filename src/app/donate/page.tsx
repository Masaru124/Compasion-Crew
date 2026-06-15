"use client";

import { motion } from "framer-motion";
import { Heart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const donationOptions = [
  { amount: 500, impact: "Provides educational materials for 5 children" },
  { amount: 1000, impact: "Supports skill training for 2 women" },
  { amount: 2500, impact: "Feeds and cares for 5 rescued animals for a month" },
  { amount: 5000, impact: "Sponsors a child's education for 3 months" },
];

export default function DonatePage() {
  return (
    <div className="planner-bg">
      <section className="pt-32 pb-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-12 h-12 mx-auto mb-5 bg-terracotta/10 rounded flex items-center justify-center">
              <Heart className="w-6 h-6 text-terracotta" />
            </div>
            <h1 className="font-heading text-fluid-hero text-foreground mb-6 tracking-tight">
              Support Our Mission
            </h1>
            <p className="text-muted-foreground">
              Your contribution helps us continue our work of empowering women,
              educating children, and caring for animals across India.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding border-t border-border">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3">
                Donation Options
              </span>
              <h2 className="font-heading text-fluid-section text-foreground mb-8 tracking-tight">
                Choose Your Impact
              </h2>
              <div className="space-y-4">
                {donationOptions.map((option) => (
                  <button
                    key={option.amount}
                    className="w-full bg-card border border-border rounded shadow-sm p-8 text-left hover:border-primary/30 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading text-3xl font-medium text-primary tracking-tight">
                        &#8377;{option.amount.toLocaleString()}
                      </span>
                      <CheckCircle className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-muted-foreground text-sm">{option.impact}</p>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-card border border-border rounded shadow-sm p-8">
                <h3 className="font-heading text-xl font-medium text-foreground mb-1 tracking-tight">
                  Custom Amount
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Enter any amount you wish to contribute. Every rupee counts towards
                  creating a better world.
                </p>
                {/* <div className="space-y-4">
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">&#8377;</span>
                    <Input type="number" placeholder="Enter amount" className="pl-8 h-12" />
                  </div>
                  <Button size="xl" className="w-full">
                    <Heart className="w-5 h-5 mr-2" />
                    Donate Now
                  </Button>
                </div> */}
                <div className="space-y-4">
                  Coming Soon
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    All donations are tax-deductible under Section 80G.
                    You will receive a receipt via email.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
