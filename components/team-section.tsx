import { Mail } from "lucide-react";
import { LinkedIn } from "developer-icons";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  linkedin?: string | null;
  email?: string | null;
}

interface TeamSectionProps {
  initialTeamMembers?: TeamMember[];
}

const defaultTeamMembers: TeamMember[] = [
  {
    name: "Khushi Kalpesh Joshi",
    role: "Founder & Director",
    bio: "Founder of COMPASSION CREW. Dedicated to building a compassionate society, connecting students, professionals, and leaders across India to drive social impact.",
    linkedin: "https://www.linkedin.com/in/khushi-kalpesh-joshi-895b822a4/",
    email: "Khushijoshi.amcec@gmail.com",
  },
  {
    name: "Bharath S",
    role: "Marketing Lead",
    bio: "Strategic marketer driving outreach, community campaigns, and digital engagement to expand the reach and social impact of COMPASSION CREW.",
    linkedin: "https://www.linkedin.com/in/bharath248m/",
    email: "bharatreddy98m@icloud.com",
  },
  {
    name: "Bichitra Behera",
    role: "Tech Lead",
    bio: "Tech Lead at COMPASSION CREW. Full-stack specialist architecting scalable platforms and developer experiences to empower volunteer initiatives.",
    linkedin: "https://linkedin.com/in/bichitrabehera",
    email: "bichitrabehera.345@gmail.com",
  },
  {
    name: "Shivnandan Tiwari",
    role: "Community & Events Lead",
    bio: "Building technology, communities, and opportunities - one project, one event, and one connection at a time.",
    linkedin: "https://linkedin.com/in/shivnandan-1303st",
    email: "shivnandantiwati1303@gmail.com",
  },
  {
    name: "Ravikiran T S",
    role: "Finance Lead",
    bio: "Finance Lead at COMPASSION CREW. Managing financial operations, budget allocations, and tax-exempt donor reporting.",
    linkedin: "https://www.linkedin.com/in/ravikiran-t-s-32078125a/",
    email: "ravikirantsrk@gmail.com",
  },
  {
    name: "Matharishwa",
    role: "CTO",
    bio: "Chief Technology Officer directing digital innovation, volunteer coordination portals, and regional tech enablement across India.",
    linkedin: "https://www.linkedin.com/in/matharishwa-s-322518325",
    email: "anithamatharishw110@gmail.com",
  },
];

export function TeamSection({ initialTeamMembers }: TeamSectionProps) {
  const members = initialTeamMembers || defaultTeamMembers;

  return (
    <section className="border-border border-t py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-20 max-w-3xl">
          <p className="mb-4 text-sm tracking-[0.25em] text-neutral-500 uppercase">
            Our Team
          </p>

          <h2 className="font-heading text-4xl font-semibold tracking-tight lg:text-6xl">
            The people behind
            <span className="text-primary"> the mission.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.name}
              className="group border-neutral-200 bg-white overflow-hidden border transition-all duration-300 "
            >
              {/* Content */}
              <div className="space-y-5 p-7">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {member.name}
                  </h3>

                  <p className="text-primary mt-2 text-sm font-medium tracking-wider uppercase">
                    {member.role}
                  </p>
                </div>

                <p className="text-muted-foreground line-clamp-4 leading-7">
                  {member.bio}
                </p>

                <div className="border-border flex items-center justify-between border-t pt-5">
                  <div className="flex gap-4">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-border hover:border-primary hover:text-primary rounded-full border p-2 transition"
                      >
                        <LinkedIn className="h-4 w-4" />
                      </a>
                    )}

                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="border-border hover:border-primary hover:text-primary rounded-full border p-2 transition"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  <span className="text-muted-foreground text-xs tracking-widest uppercase">
                    Team
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
