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
    {
      amount: 500,
      impact: "Sponsors workshop materials for 5 community participants",
    },
    { amount: 1000, impact: "Sponsors an online Expert Talk event session" },
    {
      amount: 2500,
      impact:
        "Supports organization and logistics of 1 volunteer service drive",
    },
    {
      amount: 5000,
      impact:
        "Sponsors digital learning resources and tools for youth development programs",
    },
  ],
  customAmountTitle: "Custom Amount",
  customAmountDesc:
    "Enter any amount you wish to contribute. Every rupee counts towards creating a better world.",
  taxNote:
    "All donations are tax-deductible under Section 80G. You will receive an official tax receipt via email.",
};

export function DonatePageClient({ initialDonate }: DonateSectionProps) {
  const data = initialDonate || defaultDonate;

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN").format(amount);
  };

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl">
          <span className="text-primary mb-3 block text-sm font-medium">
            Donate
          </span>
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight lg:text-4xl">
            {data.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.donationOptions.map((option) => (
            <div
              key={option.amount}
              className="border-border bg-card flex flex-col rounded-lg border p-8 transition-shadow hover:shadow-sm"
            >
              <div className="mb-3 flex items-center gap-1">
                <IndianRupee className="text-primary h-5 w-5" />
                <span className="font-heading text-foreground text-3xl font-medium">
                  {formatAmount(option.amount)}
                </span>
              </div>
              <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
                {option.impact}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <div className="border-border bg-card rounded-lg border p-8 transition-shadow hover:shadow-sm">
            <h3 className="font-heading text-foreground mb-3 text-xl font-medium">
              {data.customAmountTitle}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {data.customAmountDesc}
            </p>
          </div>

          <div className="border-border bg-card flex flex-col items-center justify-center rounded-lg border p-8 transition-shadow hover:shadow-sm">
            <div className="relative mb-3 h-40 w-40">
              <Image
                src="/images/qr-code.png"
                alt="UPI QR Code for Donation"
                fill
                sizes="160px"
                className="object-contain"
              />
            </div>
            <p className="text-muted-foreground text-center text-xs">
              Scan to donate via UPI
            </p>
          </div>
        </div>

        <div className="border-border bg-card rounded-lg border p-8 transition-shadow hover:shadow-sm">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {data.taxNote}
          </p>
        </div>
      </div>
    </section>
  );
}
