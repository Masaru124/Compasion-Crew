import { Check } from "lucide-react";

interface VolunteerData {
  title: string;
  description: string;
  formUrl: string;
  formHeight: number;
}

interface VolunteerSectionProps {
  initialVolunteer?: VolunteerData;
}

const defaultVolunteer: VolunteerData = {
  title: "Volunteer with COMPASSION CREW — Make a Real Difference in Bangalore",
  description:
    "Thank you for your interest in volunteering with us. Please complete the application form below. We will review your submission and contact shortlisted applicants.",
  formUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSeYJ4-OKlvkBQm0vSaGKHMrNWHflIMaKZQKAQxeN73b7PFoUg/viewform?embedded=true",
  formHeight: 3600,
};

const infoCards = [
  {
    title: "What You'll Do",
    items: [
      "Participate in community events and awareness campaigns",
      "Support educational programs for underprivileged children",
      "Assist in animal rescue and welfare initiatives",
      "Help with event coordination and logistics",
      "Contribute your skills in marketing, tech, or design",
    ],
  },
  {
    title: "Who Can Join",
    items: [
      "Students looking to make a difference",
      "Working professionals with limited time",
      "Anyone passionate about social impact",
      "Groups and corporate teams welcome",
      "No prior experience required",
    ],
  },
  {
    title: "What You Get",
    items: [
      "Certificate of volunteering experience",
      "Opportunity to develop new skills",
      "Network with like-minded changemakers",
      "References for professional growth",
      "The satisfaction of creating real impact",
    ],
  },
];

export function VolunteerSection({ initialVolunteer }: VolunteerSectionProps) {
  const data = initialVolunteer || defaultVolunteer;

  return (
    <section className="py-24 lg:py-32 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mb-14">
          <span className="text-sm font-medium text-primary mb-3 block">
            Volunteer
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {infoCards.map((card) => (
            <div
              key={card.title}
              className="rounded-lg border border-border bg-card p-8 hover:shadow-sm transition-shadow"
            >
              <h3 className="font-heading text-lg font-medium text-foreground mb-5">
                {card.title}
              </h3>
              <ul className="space-y-3">
                {card.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-success mt-0.5 shrink-0">
                      <Check className="w-4 h-4" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <iframe
            src={data.formUrl}
            width="100%"
            height={data.formHeight}
            frameBorder="0"
            title="Volunteer Application Form"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
