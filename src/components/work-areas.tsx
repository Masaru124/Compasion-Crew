"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  },
  {
    id: "compassion-projects",
    title: "Compassion Projects",
    description:
      "Targeted impact initiatives focusing on future community support systems for children, senior citizens, education, and animal welfare.",
    image: "/images/children5.jpg",
    number: "05",
  },
];

interface WorkAreasProps {
  initialWorkAreas?: WorkAreaItem[];
}

export function WorkAreas({ initialWorkAreas }: WorkAreasProps) {
  const displayWorkAreas = initialWorkAreas || workAreas;
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [cycledImageIndex, setCycledImageIndex] = useState(0);

  const getImageUrl = (img: string | null | undefined) => {
    if (!img) return "/images/children1.jpg";
    if (typeof img === "string") return img;
    return "/images/children1.jpg";
  };

  const allImages = [
    "/images/children1.jpg",
    "/images/children2.jpg",
    "/images/children3.jpg",
    "/images/children4.jpg",
    "/images/children5.jpg"
  ];

  useEffect(() => {
    if (hoveredImage !== null || allImages.length === 0) return;

    const interval = setInterval(() => {
      setCycledImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [hoveredImage, allImages.length]);

  const currentImage = hoveredImage || allImages[cycledImageIndex] || "/images/children.jpg";

  return (
    <section id="work" className="bg-background">
      <div className="section-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-primary block mb-3">
            Our Core Programs
          </span>
          <h2 className="font-heading text-fluid-section text-foreground tracking-tight">
            How we create social{" "}
            <span className="italic text-primary">impact</span>.
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="hidden lg:block lg:w-1/2 relative h-[55vh] max-h-[500px] sticky top-[12vh]">
            <div className="w-full h-full rounded overflow-hidden border border-border/50 shadow-sm relative">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative"
              >
                <Image
                  src={currentImage}
                  alt="Our Work"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-16 lg:gap-24">
            {displayWorkAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredImage(getImageUrl(area.image))}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <div className="block lg:hidden w-full h-[300px] relative rounded overflow-hidden mb-8 border border-border/50">
                  <Image
                    src={getImageUrl(area.image)}
                    alt={area.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="font-heading text-5xl font-light text-primary/20">
                    {area.number}
                  </span>
                  <div className="h-px w-12 bg-border" />
                </div>

                <h3 className="font-heading text-xl font-medium text-foreground mb-4 tracking-tight">
                  {area.title}
                </h3>

                <p className="text-muted-foreground mb-8 max-w-lg">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
