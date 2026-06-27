import Image from "next/image";

interface WorkAreaItem {
  id: string;
  title: string;
  description: string;
  image: string | null | undefined;
  href?: string;
  number: string;
}

const workAreas: WorkAreaItem[] = [
  {
    id: "expert-talks",
    title: "Expert Talks & Knowledge Sessions",
    description:
      "Bringing industry experts, leaders, and changemakers together to share insights, experiences, and practical knowledge that inspire personal growth and social impact.",
    image: "/images/children1.jpg",
    number: "01",
  },
  {
    id: "community-events",
    title: "Community Engagement Events",
    description:
      "Interactive events that foster networking, collaboration, and meaningful discussions around social responsibility and personal development.",
    image: "/images/children2.jpg",
    number: "02",
  },
  {
    id: "volunteer-initiatives",
    title: "Volunteer & Service Initiatives",
    description:
      "Structured opportunities for students, professionals, and changemakers to contribute their time and skills to support local community needs and social causes.",
    image: "/images/children3.jpg",
    number: "03",
  },
  {
    id: "awareness-campaigns",
    title: "Social Awareness Campaigns",
    description:
      "Programs designed to educate, discuss, and raise awareness about important social issues affecting communities and underserved groups.",
    image: "/images/children4.jpg",
    number: "04",
  }
];

interface WorkAreasProps {
  initialWorkAreas?: WorkAreaItem[];
}

export function WorkAreas({ initialWorkAreas }: WorkAreasProps) {
  const displayWorkAreas = initialWorkAreas || workAreas;

  const getImageUrl = (img: string | null | undefined) => {
    if (!img) return "/images/children1.jpg";
    if (typeof img === "string") return img;
    return "/images/children1.jpg";
  };

  return (
    <section id="work" className="border-border border-t py-24">
      <div className="mx-auto px-6">
        {/* Heading */}
        <div className="mb-20 max-w-3xl">
          <p className="mb-4 text-sm tracking-[0.2em] text-neutral-500 uppercase">
            What We Do
          </p>

          <h2 className="font-heading text-4xl font-semibold tracking-tight lg:text-6xl">
            Creating impact through
            <br />
            <span className="text-primary">compassion.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {displayWorkAreas.map((area) => (
            <div
              key={area.id}
              className="group flex min-h-[420px] flex-col border border-neutral-200 bg-primary/20 text-black p-4 transition-all duration-300"
            >
              {/* Title */}
              <h3 className="text-2xl h-12 font-semibold">{area.title}</h3>

              <div className="mt-6 h-px bg-neutral-200" />

              {/* Image */}
              <div className="relative mb-8 aspect-[4/2] overflow-hidden">
                <Image
                  src={getImageUrl(area.image)}
                  alt={area.title}
                  fill
                  className="object-cover transition duration-500"
                />
              </div>

              {/* Description */}
              <p className="mt-auto leading-7 text-neutral-900">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
