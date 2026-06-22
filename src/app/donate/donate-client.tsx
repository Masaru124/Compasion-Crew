"use client";

import { motion } from "framer-motion";
import { Heart, CheckCircle } from "lucide-react";

interface DonationOption {
  amount: number;
  impact: string;
}

interface DonateData {
  title: string;
  description: string;
  donationOptions: DonationOption[];
  customAmountTitle: string;
  customAmountDesc: string;
  taxNote: string;
}

const defaultDonate: DonateData = {
  title: "Support Our Mission - 80G Tax Deductible NGO Donations",
  description: "Your contribution directly supports our community events, expert talk sessions, volunteer initiatives, and future compassion projects. All donations are tax-deductible under Section 80G.",
  donationOptions: [
    { amount: 500, impact: "Sponsors workshop materials for 5 community participants" },
    { amount: 1000, impact: "Sponsors an online Expert Talk event session" },
    { amount: 2500, impact: "Supports organization and logistics of 1 volunteer service drive" },
    { amount: 5000, impact: "Sponsors digital learning resources and tools for youth development programs" },
  ],
  customAmountTitle: "Custom Amount",
  customAmountDesc: "Enter any amount you wish to contribute. Every rupee counts towards creating a better world.",
  taxNote: "All donations are tax-deductible under Section 80G. You will receive an official tax receipt via email."
};

interface DonatePageClientProps {
  initialDonate?: DonateData;
}

export function DonatePageClient({ initialDonate }: DonatePageClientProps) {
  const data = initialDonate || defaultDonate;

  const donateSchema = {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    "name": "Donate to COMPASSION CREW NGO",
    "description": "Support COMPASSION CREW's social impact programs. Donations are tax-deductible under Section 80G of the Income Tax Act.",
    "recipient": {
      "@type": "NGO",
      "name": "COMPASSION CREW",
      "url": "https://compassioncrew.in",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <div className="planner-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donateSchema) }}
      />
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
              {data.title}
            </h1>
            <p className="text-muted-foreground">
              {data.description}
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
                Tax-Exempt Donation Options
              </span>
              <h2 className="font-heading text-fluid-section text-foreground mb-8 tracking-tight">
                Empower Lives & Save Animals
              </h2>
              <div className="space-y-4">
                {data.donationOptions.map((option) => (
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
                  {data.customAmountTitle}
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {data.customAmountDesc}
                </p>
                <div className="space-y-4">
                  Coming Soon
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    {data.taxNote}
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
