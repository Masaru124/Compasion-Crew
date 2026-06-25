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
    }, 3000);

    return () => clearInterval(interval);
  }, [hoveredImage, allImages.length]);

  const currentImage = hoveredImage || allImages[cycledImageIndex] || "/images/children1.jpg";

  return (
    <section id="work" className="relative planner-bg border-b border-border/60">
      <div className="section-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3 border-l-2 border-terracotta pl-3">
            Our Core Programs
          </span>
          <h2 className="font-heading text-fluid-section text-foreground tracking-tight font-light">
            How we create social <span className="italic text-primary">impact</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Sticky Image Showcase (Left) */}
          <div className="hidden lg:block lg:w-1/2 relative h-[55vh] max-h-[500px] sticky top-[12vh] z-10">
            <div className="w-full h-full bg-card/25 backdrop-blur-md border border-border/85 p-3 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] relative">
              <div className="w-full h-full rounded-2xl overflow-hidden relative border border-border/60">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={currentImage}
                    alt="COMPASSION CREW Program Showcase"
                    fill
                    sizes="50vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </div>
              <div className="absolute bottom-6 left-6 font-mono text-[9px] bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-sm tracking-wider uppercase">
                SYS_LOC // VISUAL_FEED
              </div>
            </div>
          </div>

          {/* Program Cards list (Right) */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {displayWorkAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredImage(getImageUrl(area.image))}
                onMouseLeave={() => setHoveredImage(null)}
                className="group relative bg-card/20 backdrop-blur-md border border-border/80 hover:border-primary/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 overflow-hidden"
              >
                {/* Mobile visual preview */}
                <div className="block lg:hidden w-full h-[220px] relative rounded-xl overflow-hidden mb-6 border border-border/50">
                  <Image
                    src={getImageUrl(area.image)}
                    alt={area.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 font-mono text-[8px] bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-sm tracking-wider uppercase">
                    SYS-LOC // AREA-0{index + 1}
                  </div>
                </div>

                {/* Technical Coordinates Grid Header */}
                <div className="flex justify-between items-center mb-5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60 border-b border-border/40 pb-3">
                  <span>SYS-LOC // AREA-0{index + 1}</span>
                  <span className="text-terracotta font-semibold">[CORE_SECTOR]</span>
                </div>

                <h3 className="font-heading text-2xl font-light text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {area.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-1">
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
