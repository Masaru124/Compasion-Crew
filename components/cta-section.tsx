import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTAData {
  title: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
}

const defaultCTA: CTAData = {
  title: "Be Part of the Change",
  description: "Every contribution—whether your time, skills, or resources—helps us continue our mission of dignity and care for every life.",
  primaryBtnText: "Donate Now",
  primaryBtnLink: "/donate",
  secondaryBtnText: "Join as Volunteer",
  secondaryBtnLink: "/volunteer",
};

interface CTASectionProps {
  initialCTA?: CTAData;
}

export function CTASection({ initialCTA }: CTASectionProps) {
  const data = initialCTA || defaultCTA;

  return (
    <section className="border-b border-border py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-lg border border-border bg-card p-10 md:p-16 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
            {data.title}
          </h2>

          <p className="text text-muted-foreground max-w-2xl mx-auto mb-10 ">
            {data.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={data.primaryBtnLink}>
              <Button className="w-full sm:w-auto">
                {data.primaryBtnText}
              </Button>
            </Link>
            <Link href={data.secondaryBtnLink}>
              <Button variant="outline" className="w-full sm:w-auto">
                {data.secondaryBtnText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
