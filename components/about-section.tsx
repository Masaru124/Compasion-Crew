import { Heart, Lightbulb, Users, Leaf, Eye, Target } from "lucide-react";

const defaultMission = {
  heading: "Compassion Crew",
  paragraphs: [
    "COMPASSION CREW is a social impact community founded in 2026 with a mission to build a compassionate society where individuals are empowered to learn, connect, and contribute. We bring together students, professionals, and changemakers to create meaningful change through expert talks, community events, volunteering, and social campaigns.",
    "We believe that small acts of compassion, when multiplied by a community of committed people, can create a lasting impact. Our work spans education, women's empowerment, animal welfare, and community development across India.",
  ],
  vision:
    "A compassionate society where every individual has the opportunity to learn, connect, and contribute meaningfully to the well-being of others.",
  missionItems: [
    "Empower individuals through knowledge-sharing and expert-led sessions",
    "Build strong communities through networking and collaborative events",
    "Create structured volunteering opportunities for meaningful service",
    "Raise awareness about critical social issues affecting underserved groups",
    "Develop sustainable compassion projects for children, elderly, and animals",
  ],
};

interface AboutSectionProps {
  initialMission?: typeof defaultMission;
}

const values = [
  {
    icon: Heart,
    title: "Empathy",
    description:
      "Understanding and sharing the feelings of others is at the core of everything we do.",
  },
  {
    icon: Lightbulb,
    title: "Learning",
    description:
      "We believe in continuous growth through knowledge sharing and skill development.",
  },
  {
    icon: Users,
    title: "Connection",
    description:
      "Building meaningful relationships that strengthen communities and foster collaboration.",
  },
  {
    icon: Leaf,
    title: "Contribution",
    description:
      "Every act of service, no matter how small, creates ripples of positive change.",
  },
];

export function AboutSection({ initialMission }: AboutSectionProps) {
  const data = initialMission || defaultMission;

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-lg tracking-[0.25em] text-neutral-500 uppercase">
            About
          </p>

          <div className="inline-block">
            <h2 className="font-heading text-4xl font-semibold md:text-5xl lg:text-6xl">
              {data.heading}
            </h2>

            <svg
              className="mt-2 w-full"
              viewBox="0 0 300 20"
              preserveAspectRatio="none"
            >
              <path
                d="M5 14 C80 2, 220 2, 295 -1"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                className="text-primary"
              />
            </svg>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-4xl space-y-10 text-left">
          <p className="text-xl leading-9 text-neutral-600 md:text-2xl md:leading-10">
            <span className="rounded-md bg-blue-500 text-black px-2 py-1 font-semibold ">
              COMPASSION CREW
            </span>{" "}
            is a{" "}
            <span className="rounded-md bg-emerald-500 text-black px-2 py-1 font-semibold ">
              social impact community
            </span>{" "}
            founded in 2026 with a mission to build a{" "}
            <span className="rounded-md bg-rose-500 text-black px-2 py-1 font-semibold ">
              compassionate society
            </span>{" "}
            where individuals are empowered to learn, connect, and contribute.
            We bring together students, professionals, and changemakers to
            create meaningful change through expert talks, community events,
            volunteering, and social campaigns.
          </p>

          <p className="text-xl leading-9 text-neutral-600 md:text-2xl md:leading-10">
            We believe that{" "}
            <span className="rounded-md bg-amber-500 text-black px-2 py-1 font-semibold ">
              small acts of compassion
            </span>{" "}
            can create{" "}
            <span className="rounded-md bg-violet-500 text-black px-2 py-1 font-semibold ">
              lasting impact
            </span>
            . Our work spans education, women's empowerment, animal welfare, and
            community development across India.
          </p>
        </div>
      </div>
    </section>
  );
}
