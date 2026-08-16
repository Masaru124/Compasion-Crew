import { Mail } from "lucide-react";
import { LinkedIn } from "developer-icons";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  linkedin?: string | null;
  email?: string | null;
  image?: string | null;
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
    image: "/images/khushi.jpg",
  },
  {
    name: "Bharath S",
    role: "Marketing Lead",
    bio: "Strategic marketer driving outreach, community campaigns, and digital engagement to expand the reach and social impact of COMPASSION CREW.",
    linkedin: "https://www.linkedin.com/in/bharath248m/",
    email: "bharatreddy98m@icloud.com",
    image: "/images/bharath.jpeg",
  },
  {
    name: "Bichitra Behera",
    role: "Tech Lead",
    bio: "Tech Lead at COMPASSION CREW. Full-stack specialist architecting scalable platforms and developer experiences to empower volunteer initiatives.",
    linkedin: "https://linkedin.com/in/bichitrabehera",
    email: "bichitrabehera.345@gmail.com",
    image: "/images/bichitra.png",
  },
  {
    name: "Shivnandan Tiwari",
    role: "Community & Events Lead",
    bio: "Building technology, communities, and opportunities - one project, one event, and one connection at a time.",
    linkedin: "https://linkedin.com/in/shivnandan-1303st",
    email: "shivnandantiwati1303@gmail.com",
    image: "/images/shivam.png",
  },
  {
    name: "Ravikiran T S",
    role: "Finance Lead",
    bio: "Finance Lead at COMPASSION CREW. Managing financial operations, budget allocations, and tax-exempt donor reporting.",
    linkedin: "https://www.linkedin.com/in/ravikiran-t-s-32078125a/",
    email: "ravikirantsrk@gmail.com",
    image: "/images/ravikiran.png",
  },
  {
    name: "Matharishwa",
    role: "CTO",
    bio: "Chief Technology Officer directing digital innovation, volunteer coordination portals, and regional tech enablement across India.",
    linkedin: "https://www.linkedin.com/in/matharishwa-s-322518325",
    email: "anithamatharishw110@gmail.com",
    image: "/images/matha.jpeg",
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
              className="group border-neutral-200 bg-white overflow-hidden border transition-all duration-300 rounded-2xl shadow-xs hover:shadow-xl hover:-translate-y-1 flex flex-col"
            >
              {/* Vertical Photo Header — Matching Portrait Photos */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-neutral-400 bg-neutral-100">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-4 p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-neutral-900 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary mt-1 text-xs font-semibold tracking-wider uppercase font-mono">
                    {member.role}
                  </p>

                  <p className="text-neutral-600 line-clamp-3 leading-relaxed text-sm mt-3">
                    {member.bio}
                  </p>
                </div>

                <div className="border-neutral-100 flex items-center justify-between border-t pt-4 mt-auto">
                  <div className="flex gap-3">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-neutral-200 hover:border-primary hover:text-primary rounded-full border p-2 transition text-neutral-600"
                        aria-label="LinkedIn"
                      >
                        <LinkedIn className="h-4 w-4" />
                      </a>
                    )}

                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="border-neutral-200 hover:border-primary hover:text-primary rounded-full border p-2 transition text-neutral-600"
                        aria-label="Email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  <span className="text-neutral-400 text-[10px] font-mono tracking-widest uppercase">
                    COMPASSION CREW
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
