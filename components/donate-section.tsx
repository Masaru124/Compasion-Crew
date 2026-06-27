import Image from "next/image";
import { IndianRupee } from "lucide-react";

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

interface DonateSectionProps {
  initialDonate?: DonateData;
}

const defaultDonate: DonateData = {
  title: "Support Our Mission - 80G Tax Deductible Donations",
  description:
    "Your contribution directly supports our community events, expert talk sessions, volunteer initiatives, and future compassion projects. All donations are tax-deductible under Section 80G.",
  donationOptions: [
    { amount: 500, impact: "Sponsors workshop materials for 5 community participants" },
    { amount: 1000, impact: "Sponsors an online Expert Talk event session" },
    { amount: 2500, impact: "Supports organization and logistics of 1 volunteer service drive" },
    { amount: 5000, impact: "Sponsors digital learning resources and tools for youth development programs" },
  ],
  customAmountTitle: "Custom Amount",
  customAmountDesc:
    "Enter any amount you wish to contribute. Every rupee counts towards creating a better world.",
  taxNote:
    "All donations are tax-deductible under Section 80G. You will receive an official tax receipt via email.",
};

export function DonateSection({ initialDonate }: DonateSectionProps) {
  const data = initialDonate || defaultDonate;

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN").format(amount);
  };

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mb-14">
          <span className="text-sm font-medium text-primary mb-3 block">
            Donate
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
            {data.title}
          </h2>
          <p className="text text-muted-foreground max-w-2xl">
            {data.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {data.donationOptions.map((option) => (
            <div
              key={option.amount}
              className="rounded-lg border border-border bg-card p-8 hover:shadow-sm transition-shadow flex flex-col"
            >
              <div className="flex items-center gap-1 mb-3">
                <IndianRupee className="w-5 h-5 text-primary" />
                <span className="font-heading text-3xl font-medium text-foreground">
                  {formatAmount(option.amount)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {option.impact}
              </p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-lg border border-border bg-card p-8 hover:shadow-sm transition-shadow">
            <h3 className="font-heading text-xl font-medium text-foreground mb-3">
              {data.customAmountTitle}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data.customAmountDesc}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-8 hover:shadow-sm transition-shadow flex flex-col items-center justify-center">
            <div className="relative w-40 h-40 mb-3">
              <Image
                src="/images/qr-code.png"
                alt="UPI QR Code for Donation"
                fill
                sizes="160px"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Scan to donate via UPI
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-8 hover:shadow-sm transition-shadow">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.taxNote}
          </p>
        </div>
      </div>
    </section>
  );
}
