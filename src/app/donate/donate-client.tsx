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
  title: "Support Our Mission - 80G Tax Deductible Donations",
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
    "name": "Donate to COMPASSION CREW",
    "description": "Support COMPASSION CREW's social impact programs. Donations are tax-deductible under Section 80G of the Income Tax Act.",
    "recipient": {
      "@type": "Organization",
      "name": "COMPASSION CREW",
      "url": "https://www.compassioncrew.in",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <div className="planner-bg min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donateSchema) }}
      />
      <section className="pt-32 pb-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-12 h-12 mx-auto mb-5 bg-terracotta/10 border border-terracotta/20 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-terracotta" />
            </div>
            <h1 className="font-heading text-fluid-hero text-foreground mb-6 tracking-tight font-light">
              {data.title}
            </h1>
            <p className="text-muted-foreground text-sm">
              {data.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-12">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Donation options */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3 border-l-2 border-terracotta pl-3">
                Tax-Exempt Donation Options
              </span>
              <h2 className="font-heading text-fluid-section text-foreground mb-8 tracking-tight font-light">
                Empower Lives & Save <span className="italic text-primary">Animals</span>
              </h2>
              <div className="space-y-4">
                {data.donationOptions.map((option, index) => (
                  <button
                    key={option.amount}
                    className="w-full bg-card/20 backdrop-blur-md border border-border/80 rounded-2xl p-6 text-left hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden relative"
                  >
                    {/* Technical log header */}
                    <div className="flex justify-between items-center mb-4 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60 border-b border-border/40 pb-2">
                      <span>COORD // AMT-0{index + 1}</span>
                      <span className="text-terracotta font-semibold">[80G_TAX_SAVING]</span>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading text-3xl font-light text-primary tracking-tight group-hover:text-primary transition-colors">
                        &#8377;{option.amount.toLocaleString()}
                      </span>
                      <CheckCircle className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">{option.impact}</p>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Custom Amount Form info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="group relative bg-card/25 backdrop-blur-md border border-border/80 hover:border-primary/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
                <div className="flex justify-between items-center mb-6 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60 border-b border-border/40 pb-3">
                  <span>COORD // CC-DON-01</span>
                  <span className="text-terracotta font-semibold">[CUSTOM_DIRECTIVE]</span>
                </div>
                <h3 className="font-heading text-2xl font-light text-foreground mb-2 tracking-tight">
                  {data.customAmountTitle}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {data.customAmountDesc}
                </p>
                
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl font-mono text-xs text-primary uppercase tracking-wider text-center">
                  Payment Gateway Coming Soon
                </div>

                <div className="mt-8 pt-6 border-t border-border/40">
                  <p className="text-xs text-muted-foreground leading-relaxed">
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
