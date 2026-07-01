import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as fs from "fs";
import * as path from "path";
import {
  events,
  siteSettings,
  heroSection,
  ctaSection,
  workAreas,
  stories,
  founderPage,
  volunteerPage,
  donatePage,
  teamMembers,
  blogs,
} from "./schema";

// Custom environment variables parser for .env.local
const envLocalPath = path.join(__dirname, "..", "..", ".env.local");
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf8");
  envContent.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const parts = trimmed.split("=");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      let val = parts.slice(1).join("=").trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  });
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("❌ Error: DATABASE_URL is missing!");
  process.exit(1);
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

const siteSettingsToSeed = {
  id: "singleton-site-settings",
  email: "compasioncrew@gmail.com",
  phone: "+91 8884156247",
  address: "Bangalore, Karnataka, India",
  footerDescription: "Dignity, care, and equal value for every life. Supporting women, children, and animals across India.",
  copyrightText: "COMPASSION CREW. All rights reserved.",
};

const heroSectionToSeed = {
  id: "singleton-hero-section",
  eyebrow: "Social Impact Community",
  title: "Learn. Connect. *Contribute.*",
  description: "A community that empowers people to learn, connect, and contribute through expert talks, networking events, volunteering, and social campaigns.",
  primaryBtnText: "Get Involved",
  primaryBtnLink: "/volunteer",
  secondaryBtnText: "Learn More",
  secondaryBtnLink: "/about",
  image: "/images/yoga.jpeg",
};

const ctaSectionToSeed = {
  id: "singleton-cta-section",
  title: "Be Part of the Change",
  description: "Every contribution—whether your time, skills, or resources—helps us continue our mission of dignity and care for every life.",
  primaryBtnText: "Donate Now",
  primaryBtnLink: "/donate",
  secondaryBtnText: "Join as Volunteer",
  secondaryBtnLink: "/volunteer",
};

const workAreasToSeed = [
  {
    id: "expert-talks",
    title: "Expert Talks & Knowledge Sessions",
    description: "Bringing industry experts, leaders, and changemakers together to share insights, experiences, and practical knowledge that inspire personal growth and social impact.",
    image: "/images/children1.jpg",
    number: "01",
  },
  {
    id: "community-events",
    title: "Community Engagement Events",
    description: "Interactive events that foster networking, collaboration, and meaningful discussions around social responsibility and personal development.",
    image: "/images/children2.jpg",
    number: "02",
  },
  {
    id: "volunteer-initiatives",
    title: "Volunteer & Service Initiatives",
    description: "Structured opportunities for students, professionals, and changemakers to contribute their time and skills to support local community needs and social causes.",
    image: "/images/children3.jpg",
    number: "03",
  },
  {
    id: "awareness-campaigns",
    title: "Social Awareness Campaigns",
    description: "Programs designed to educate, discuss, and raise awareness about important social issues affecting communities and underserved groups.",
    image: "/images/children4.jpg",
    number: "04",
  },
  {
    id: "compassion-projects",
    title: "Compassion Projects",
    description: "Targeted impact initiatives focusing on future community support systems for children, senior citizens, education, and animal welfare.",
    image: "/images/children5.jpg",
    number: "05",
  },
];

const storiesToSeed = [
  {
    id: "story-1",
    quote: "COMPASSION CREW didn't just give me skills, they gave me confidence. Today, I run my own tailoring business and support my family with dignity.",
    name: "Lakshmi Devi",
    role: "Women Empowerment Program",
    location: "Rajasthan",
    approved: true,
  },
  {
    id: "story-2",
    quote: "My daughter now goes to school every day with a smile. The educational support changed not just her life, but our entire family's future.",
    name: "Mohammed Rafiq",
    role: "Children Education Program",
    location: "Kerala",
    approved: true,
  },
  {
    id: "story-3",
    quote: "When they rescued my street dog friend Bruno, I saw true compassion in action. They treat every animal with the love they deserve.",
    name: "Priya Sharma",
    role: "Animal Rescue Volunteer",
    location: "Mumbai",
    approved: true,
  },
];

const founderPageToSeed = {
  id: "singleton-founder-page",
  name: "Khushi Kalpesh Joshi",
  role: "Founder & Director",
  biography: [
    "Khushi Kalpesh Joshi founded COMPASSION CREW in 2026 with a simple yet profound vision: to build a compassionate society where individuals are empowered to learn, serve, and create meaningful change in their communities.",
    "With a heart that beats for service, she has dedicated her life to creating platforms for connection and learning. Under her leadership, COMPASSION CREW has grown from a small initiative to a social impact movement connecting students, professionals, and leaders across India.",
    "Like many young people, we saw social issues around us—children needing support, elderly people facing loneliness, animals in need of care, and communities that could benefit from more compassion and connection. We wanted to help, but we also realized that many people who wanted to contribute didn't know where to start.",
    "What began as an idea soon became a mission: to create a platform where people could learn, connect, and take meaningful action together.",
    "We started with limited resources but a clear purpose. Instead of waiting for funding or perfect conditions, we focused on building a community. Through expert talks, community events, volunteering opportunities, and awareness initiatives, Compassion Crew aims to inspire individuals to use their time, skills, and energy to create positive change.",
    "Our journey is still in its early stages, but our vision is long-term. We believe that small acts of compassion, when multiplied by a community of committed people, can create a lasting impact.",
    "Compassion Crew is more than an organization—it's a movement built on the idea that everyone has the power to contribute, regardless of their background, experience, or resources.",
    "This is only the beginning."
  ],
  image: "/images/founders.jpeg",
};

const volunteerPageToSeed = {
  id: "singleton-volunteer-page",
  title: "Volunteer with COMPASSION CREW — Make a Real Difference in Bangalore",
  description: "Thank you for your interest in volunteering with us. Please complete the application form below. We will review your submission and contact shortlisted applicants.",
  formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeYJ4-OKlvkBQm0vSaGKHMrNWHflIMaKZQKAQxeN73b7PFoUg/viewform?embedded=true",
  formHeight: 3600,
};

const donatePageToSeed = {
  id: "singleton-donate-page",
  title: "Support Our Mission - Empower Communities",
  description: "Your contribution directly supports our community events, expert talk sessions, volunteer initiatives, and future compassion projects.",
  donationOptions: JSON.stringify([
    { amount: 500, impact: "Sponsors workshop materials for 5 community participants" },
    { amount: 1000, impact: "Sponsors an online Expert Talk event session" },
    { amount: 2500, impact: "Supports organization and logistics of 1 volunteer service drive" },
    { amount: 5000, impact: "Sponsors digital learning resources and tools for youth development programs" },
  ]),
  customAmountTitle: "Custom Amount",
  customAmountDesc: "Enter any amount you wish to contribute. Every rupee counts towards creating a better world.",
  taxNote: "As a community-driven social impact platform (not a registered NGO), donations to Compassion Crew are not eligible for 80G tax deductions. We maintain full transparency in funding allocation.",
};

const teamMembersToSeed = [
  {
    id: "team-member-0",
    name: "Khushi Kalpesh Joshi",
    role: "Founder & Director",
    bio: "Founder of COMPASSION CREW. Dedicated to building a compassionate society, connecting students, professionals, and leaders across India to drive social impact.",
    linkedin: "https://www.linkedin.com/in/khushi-kalpesh-joshi-895b822a4/",
    email: "Khushijoshi.amcec@gmail.com",
  },
  {
    id: "team-member-1",
    name: "Bharath S",
    role: "Marketing Lead",
    bio: "Strategic marketer driving outreach, community campaigns, and digital engagement to expand the reach and social impact of COMPASSION CREW.",
    linkedin: "https://www.linkedin.com/in/bharath248m/",
    email: "bharatreddy98m@icloud.com",
  },
  {
    id: "team-member-2",
    name: "Bichitra Behera",
    role: "Tech Lead",
    bio: "Tech Lead at COMPASSION CREW. Full-stack specialist architecting scalable platforms and developer experiences to empower volunteer initiatives.",
    linkedin: "https://linkedin.com/in/bichitrabehera",
    email: "bichitrabehera.345@gmail.com",
  },
  {
    id: "team-member-3",
    name: "Shivnandan Tiwari",
    role: "Community & Events Lead",
    bio: "Building technology, communities, and opportunities - one project, one event, and one connection at a time.",
    linkedin: "https://linkedin.com/in/shivnandan-1303st",
    email: "shivnandantiwati1303@gmail.com",
  },
  {
    id: "team-member-4",
    name: "Ravikiran T S",
    role: "Finance Lead",
    bio: "Finance Lead at COMPASSION CREW. Managing financial operations, budget allocations, and tax-exempt donor reporting.",
    linkedin: "https://www.linkedin.com/in/ravikiran-t-s-32078125a/",
    email: "ravikirantsrk@gmail.com",
  },
  {
    id: "team-member-5",
    name: "Matharishwa",
    role: "CTO",
    bio: "Chief Technology Officer directing digital innovation, volunteer coordination portals, and regional tech enablement across India.",
    linkedin: "https://www.linkedin.com/in/matharishwa-s-322518325",
    email: "anithamatharishw110@gmail.com",
  },
];

const eventsToSeed = [
  {
    id: "event-yoga",
    title: "Yoga & Mindfulness Session",
    description: "A community-focused yoga and meditation session to build strength, flexibility, and inner peace. Co-organized for youth and professionals.",
    date: "2026-06-21",
    time: "07:30 - 09:00",
    location: "Cubbon Park, Bangalore",
    category: "Workshop",
    spots: 50,
    image: "/images/yoga.jpeg",
    isPast: true,
    registrationOpen: false,
    details: "Join us for a relaxing and grounding morning of Yoga. Led by certified instructors, this session will cover basic asanas, pranayama (breathing exercises), and a short guided meditation.\n\nWho should attend:\n- Beginners looking to start their yoga journey\n- Regular practitioners looking to practice in a community setting\n- Anyone wanting a mindful start to their weekend.\n\nWhat to bring:\n- Your own yoga mat\n- A water bottle\n- Comfortable clothing.\n\nVenue: Bandstand area, Cubbon Park, Bangalore.",
    gallery: ["/images/yoga2.jpeg", "/images/yoga3.png", "/images/yoga4.png"],
  },
  {
    id: "event-healthcare-ai",
    title: "Intelligent Healthcare: The Rise of Agentic AI",
    description: "An engaging session on how agentic AI is transforming modern healthcare, highlighting generative workflows, data platforms, and future trends. Co-organized with Moksha Foundation.",
    date: "2026-06-29",
    time: "10:00 - 16:00",
    location: "PES University, Banashankari, Bangalore",
    category: "Expert Talk",
    spots: 100,
    image: "/images/healthcare_ai.png",
    isPast: false,
    registrationOpen: true,
    details: "Compassion Crew, in collaboration with Moksha Foundation, brings you an expert session on the future of healthcare technology. Join Asha Holla, an experienced AI engineer at Bloom Value Corporation specializing in Azure data/AI ecosystems and healthcare applications. She will dive deep into how Agentic AI and generative workflows are driving clinical efficiency, risk adjustment compliance, and data-driven healthcare decisions.\n\nWho should attend:\n- Tech professionals and students interested in AI/ML\n- Healthcare technology innovators\n- Anyone interested in the future of intelligence systems in medicine.\n\nSpeaker: Asha Holla (https://www.linkedin.com/in/ashaholla)\nOrganisers: Compassion Crew & Moksha Foundation\n\nAgenda:\n- 10:00 AM: Introductions & Welcome\n- 10:30 AM: Keynote: The Rise of Agentic AI in Healthcare by Asha Holla\n- 12:00 PM: Q&A and Interactive Panel\n- 01:00 PM: Networking Lunch\n- 02:00 PM: Group Brainstorming Session\n- 03:30 PM: Closing Remarks & Certificates\n\nVenue: PES University, Banashankari, Bangalore.",
    gallery: [],
  },
];

const blogsToSeed = [
  {
    id: "blog-1",
    title: "Creating Lasting Social Impact: A Step-by-Step Approach",
    slug: "creating-lasting-social-impact-step-by-step",
    publishedAt: "2026-06-22T10:00:00Z",
    excerpt: "Discover a structured, actionable guide to making a sustainable social impact, from defining your core cause to measuring and scaling your efforts for long-term community benefits.",
    category: "Social Impact",
    mainImage: "/images/social_impact_blog.png",
    authorName: "Khushi Kalpesh Joshi",
    authorRole: "Founder & Director",
    authorBio: "Founder of COMPASSION CREW. Dedicated to building a compassionate society, connecting students, professionals, and leaders across India to drive social impact.",
    body: JSON.stringify([
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Creating a lasting social impact is one of the most rewarding endeavors an individual or organization can undertake. However, true change goes beyond quick fixes or temporary charity. It requires a systematic, empathetic, and structured approach to address the root causes of societal gaps. In rapidly growing urban centers and remote rural areas alike, sustainable development hinges on building community capacity rather than fostering dependency.",
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Understanding the Core Paradigm: Charity vs. Systemic Change" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "While charitable donations and emergency relief drives are critical during crises, they are transactional. Once resources are consumed, the beneficiaries often return to their initial state of vulnerability. Systemic change, on the other hand, reorganizes the structures that created the problem. According to a 2024 analysis by the ",
          },
          {
            _type: "span",
            text: "Stanford Social Innovation Review (SSIR)",
            marks: ["link-ssir"]
          },
          {
            _type: "span",
            text: ", social impact initiatives designed with community-led capacity building are significantly more likely to achieve sustainable outcomes beyond five years than top-down charity models. By changing the framework from giving assistance to building agency, we empower individuals to shape their own futures."
          }
        ],
        markDefs: [
          {
            _key: "link-ssir",
            _type: "link",
            href: "https://ssir.org"
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Step 1: Identify the Root Problem & Define Your Cause" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Before launching any social campaign, it is vital to research and map out the community. Many programs fail because they address symptoms rather than the disease. Spend time listening to community members, gathering quantitative data, and mapping out structural issues. As a community, we believe that charity addresses the immediate hunger of today, but systemic design builds the agricultural infrastructure for a generation. At COMPASSION CREW, we begin every project by visiting the neighborhood, interviewing families, and aligning our goals with their self-identified needs."
          }
        ],
        markDefs: []
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Step 2: Establish Clear, Measurable Goals" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "A vague mission statement like 'helping children' makes it hard to coordinate resources. Instead, set Specific, Measurable, Achievable, Relevant, and Time-bound (SMART) goals. For example: 'Provide weekly basic digital literacy mentorship to 50 children in the Bangalore municipal schools by December 2026.' Clear goals enable volunteer coordinators to design precise lesson plans and track progress."
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Step 3: Design Sustainable, Empowerment-Focused Solutions" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Focus on programs that teach skills, build infrastructure, or provide resource pathways that allow beneficiaries to ultimately support themselves. Co-create solutions with the local community to foster ownership. Whether it is vocational tailoring for women, digital workshops for youth, or animal welfare awareness, the ultimate goal should be self-reliance."
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Step 4: Build a Dedicated Team and Partner Network" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "No single person can create systemic change alone. Connect with local volunteers, corporate partners, and other social impact communities. COMPASSION CREW, for instance, thrives because of a strong network of coordinators and passionate volunteers who share a unified vision. Utilizing platforms like iVolunteer or Youth for Seva helps aggregate community talent for maximum collective impact."
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Step 5: Mobilize Resources & Maintain Legal Compliance" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Structure your fundraising, logistics, and compliance. Transparency builds trust. Offering clear pathways for donation allocation helps mobilize individual support that fuels ground operations. Be completely transparent with your financial statements and regularly publish impact assessment logs."
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Step 6: Measure, Document, and Scale Impact" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Collect data continually. Document before-and-after conditions, write case studies, and record quantitative stats (e.g. lives impacted, children educated). Share these stories with your network to attract more support. Once a model is proven successful in one Bangalore neighborhood, codify the processes and scale it to other locations across Karnataka and India."
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Frequently Asked Questions (FAQ) about Social Impact" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "How can an individual start making a social impact?" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The easiest way to begin is by offering your time. You can sign up on our ",
          },
          {
            _type: "span",
            text: "volunteer registration page",
            marks: ["link-vol"]
          },
          {
            _type: "span",
            text: " to join upcoming weekend campaigns. Sharing your professional skills (like coding, marketing, or design) is also highly valuable."
          }
        ],
        markDefs: [
          {
            _key: "link-vol",
            _type: "link",
            href: "/volunteer"
          }
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "What makes a social impact program sustainable?" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Sustainability is achieved when the community actively participates in program execution and the focus is on skill building rather than handouts. Secure, transparent funding models also ensure operational longevity."
          }
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "How do we measure the success of a community initiative?" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Success is measured using double-loop evaluation: quantitative indicators (such as the number of youth trained, bags distributed, or hours volunteered) combined with qualitative reviews (such as case studies of individual career growth and household income improvements)."
          }
        ]
      },
      {
        _type: "block",
        style: "blockquote",
        children: [
          {
            _type: "span",
            text: "'True compassion is not just feeling empathy, but having the courage and structure to act on it.' — Khushi Kalpesh Joshi",
          }
        ]
      }
    ]),
    seoTitle: "Creating Lasting Social Impact: A Step-by-Step Approach",
    seoDescription: "A structured, actionable guide to making a sustainable social impact, from defining your cause to measuring and scaling your social impact initiatives in India.",
    keywords: ["social impact", "community development", "sustainable volunteering", "social impact Bangalore", "social change guide", "measuring community impact", "CSR projects Bangalore"],
  },
  {
    id: "blog-2",
    title: "The Power of Volunteering: How 2 Hours a Week Can Change Lives",
    slug: "power-of-volunteering-changing-lives",
    publishedAt: "2026-06-15T09:00:00Z",
    excerpt: "Explore the psychological, social, and physical benefits of volunteering, and learn how dedicating just two hours a week can create ripples of positive change in your community.",
    category: "Volunteering",
    mainImage: "/images/children2.jpg",
    authorName: "Khushi Kalpesh Joshi",
    authorRole: "Founder & Director",
    authorBio: "Founder of COMPASSION CREW. Dedicated to building a compassionate society, connecting students, professionals, and leaders across India to drive social impact.",
    body: JSON.stringify([
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Volunteering is one of the most powerful ways to connect with your community and drive positive social change. Whether you are helping underprivileged children, supporting animal rescue drives, or assisting in environmental cleanups, dedicating your time can create ripples of impact. In today's fast-paced, screen-dominated world, finding time to serve others can feel like a challenge. However, research reveals that even small commitments—like dedicating just two hours a week—can trigger profound benefits for both the helper and the community.",
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "1. The Neurological Benefits of Service: The Science of 'Helper’s High'" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Research shows that volunteering helps reduce stress, combat depression, and keep you physically active. A landmark study published by ",
          },
          {
            _type: "span",
            text: "Harvard Health Publishing",
            marks: ["link-harvard"]
          },
          {
            _type: "span",
            text: " highlighted that individuals who volunteer regularly experience significantly higher levels of life satisfaction compared to non-volunteers. This biological reaction releases endorphins and oxytocin, which lower blood pressure and boost emotional resilience. Regular volunteering helps combat feelings of loneliness and isolation, particularly for young professionals moving to major metropolitan areas like Bangalore."
          }
        ],
        markDefs: [
          {
            _key: "link-harvard",
            _type: "link",
            href: "https://www.health.harvard.edu"
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "2. Combating Urban Isolation and Finding Your Tribe" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "In a world increasingly marked by digital isolation, volunteering brings together people from different backgrounds who share a common purpose. You build deep connections, professional networks, and lifelong friendships with fellow changemakers. Working side-by-side with others to paint a classroom, host an educational workshop, or coordinate shelter logistics breaks down social barriers and builds mutual trust. Volunteering triggers a neurological feedback loop—when you serve, the brain releases oxytocin, reducing cortisol levels and mitigating urban isolation."
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "3. Professional Growth: Developing Crucial Soft Skills" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Volunteering acts as a leadership laboratory. It allows you to develop project management, public speaking, conflict resolution, and cross-functional coordination skills outside your regular workspace. For students and young graduates, it provides practical on-ground experience that is highly valued by universities and employers. Empathy and active listening, developed through community service, are critical traits of highly effective modern leaders."
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "4. How 2 Hours on a Saturday Transforms a Community" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Getting started is simpler than you think. The key is to choose an area that aligns with your personal values and skills. If you are passionate about education, dedicating just two hours on a Saturday morning to mentor children can completely alter their academic trajectory. Start small, maintain consistency, and witness the positive ripples spread throughout your community. Ready to take action? Check out our ",
          },
          {
            _type: "span",
            text: "volunteer campaigns",
            marks: ["link-vol-camp"]
          },
          {
            _type: "span",
            text: " to find a project that matches your schedule."
          }
        ],
        markDefs: [
          {
            _key: "link-vol-camp",
            _type: "link",
            href: "/volunteer"
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Frequently Asked Questions (FAQ) about Volunteering" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "How many hours do I need to commit to volunteering?" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Consistency is far more important than quantity. Committing just 2 hours a week or 8 hours a month allows communities to coordinate events smoothly and builds reliable, long-term relationships with beneficiaries."
          }
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Can volunteering help improve my mental well-being?" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Yes, volunteering is proven to reduce symptoms of anxiety and depression. It triggers the release of oxytocin and dopamine, which lowers stress levels and increases overall life satisfaction."
          }
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Do I need special skills to volunteer?" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "No! Most initiatives require only empathy, patience, and a willingness to help. For skills-based roles (like web development, writing, or graphic design), we match your professional expertise with specific administrative or creative needs."
          }
        ]
      },
      {
        _type: "block",
        style: "blockquote",
        children: [
          {
            _type: "span",
            text: "'Volunteering is the ultimate form of community building. By giving a small portion of your week, you are investing in a healthier, more empathetic society.' — Matharishwa",
          }
        ]
      }
    ]),
    seoTitle: "The Power of Volunteering: How 2 Hours a Week Can Change Lives",
    seoDescription: "Discover the scientific, mental health, and professional benefits of volunteering. Learn how 2 hours a week can create deep community connections.",
    keywords: ["power of volunteering", "volunteering benefits", "community connection", "social impact Bangalore", "weekend volunteering Bangalore", "mental health volunteering", "volunteer work near me"],
  },
  {
    id: "blog-3",
    title: "Educating the Future: Mentoring Underprivileged Youth",
    slug: "educating-future-mentoring-youth",
    publishedAt: "2026-06-08T08:30:00Z",
    excerpt: "Education is the greatest tool for empowerment. Read about our latest initiatives to connect professional mentors with children from underserved areas.",
    category: "Education",
    mainImage: "/images/children4.jpg",
    authorName: "Khushi Kalpesh Joshi",
    authorRole: "Founder & Director",
    authorBio: "Founder of COMPASSION CREW. Dedicated to building a compassionate society, connecting students, professionals, and leaders across India to drive social impact.",
    body: JSON.stringify([
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Access to quality education is a fundamental right, yet millions of children from underprivileged backgrounds face structural barriers. They lack not just school supplies, but mentorship, role models, and exposure to digital skills. We believe that youth mentorship is the bridge to close this gap. By connecting passionate volunteers with eager young minds, we can create educational spaces that inspire lifelong learning and enable children to unlock their true potential.",
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "The Structural Divide in Public Education" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Schools teach standard curricula, but they rarely prepare children for the digital-first economy or teach critical thinking. Underfunded public schools often lack computer labs, individual attention, and extracurricular exposure. According to the ",
          },
          {
            _type: "span",
            text: "UNESCO Global Education Monitoring Report",
            marks: ["link-unesco"]
          },
          {
            _type: "span",
            text: ", the digital divide in developing regions limits the opportunities of underprivileged youth due to a lack of technical literacy and professional mentorship. Structured mentorship programs are crucial in bridging this gap."
          }
        ],
        markDefs: [
          {
            _key: "link-unesco",
            _type: "link",
            href: "https://www.unesco.org"
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Mentorship as a Catalyst for Self-Belief" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Mentorship is not just about academic tutoring; it is about building confidence and expanding aspirations. Many children from low-income communities have never met a software engineer, a doctor, or an entrepreneur. Meeting a mentor who shows interest in their future helps children dream bigger. An evaluation report published by the Indian ",
          },
          {
            _type: "span",
            text: "Ministry of Education",
            marks: ["link-moe"]
          },
          {
            _type: "span",
            text: " highlights that structured mentorship programs significantly improve school retention rates and academic outcomes among low-income students. Mentorship provides the social capital that public curricula alone cannot deliver."
          }
        ],
        markDefs: [
          {
            _key: "link-moe",
            _type: "link",
            href: "https://www.education.gov.in"
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Focus Pillars: Digital Literacy, Spoken English, and Creative Arts" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Compassion Crew's education programs prioritize three core pillars. Digital literacy bridges the technology gap, spoken English builds communication confidence, and creative arts encourage self-expression. We organize interactive games, storytelling sessions, and hands-on computer workshops that make learning active and enjoyable.",
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "How You Can Help: Become a Mentor" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "You don't need to be a professional teacher to make a difference. Spending just a few hours a month teaching basic computer literacy, playing creative games, or reading stories to children can completely transform their learning trajectory. Consistency is key—showing up regularly builds trust and shows these children that their growth matters. If you are unable to volunteer your time, you can also support our learning centers through a ",
          },
          {
            _type: "span",
            text: "donation",
            marks: ["link-donate"]
          },
          {
            _type: "span",
            text: " to help provide tablets, laptops, and study materials."
          }
        ],
        markDefs: [
          {
            _key: "link-donate",
            _type: "link",
            href: "/donate"
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Frequently Asked Questions (FAQ) about Youth Mentoring" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "What qualifications do I need to become a mentor?" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "No professional teaching experience is required. A good command of basic subjects, conversational English, or digital literacy, combined with patience, empathy, and consistency, is all you need."
          }
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "What subjects are taught during mentorship drives?" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "We focus on practical, real-world skills: basic computer operations, conversational English, public speaking, math games, science experiments, and creative arts, rather than rigid school curricula."
          }
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "How does mentoring help underprivileged children?" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Mentorship provides kids with guidance from professional role models, which dramatically improves their self-esteem, keeps them enrolled in school, teaches marketable skills, and expands their future career options."
          }
        ]
      },
      {
        _type: "block",
        style: "blockquote",
        children: [
          {
            _type: "span",
            text: "'Mentorship is not about changing a child's story; it is about showing them they have the pen to write it themselves.' — Bharath S",
          }
        ]
      }
    ]),
    seoTitle: "Educating the Future: Mentoring Underprivileged Youth",
    seoDescription: "Learn how volunteer-led youth mentorship programs in digital literacy and life skills are empowering children from low-income communities in India.",
    keywords: ["youth mentorship", "underprivileged education", "volunteer teacher Bangalore", "community education", "mentor underprivileged children India", "skill development youth", "teach kids Bangalore"],
  },
  {
    id: "blog-4",
    title: "How to Volunteer in Bangalore: The Ultimate Guide for Professionals and Students",
    slug: "how-to-volunteer-in-bangalore-guide",
    publishedAt: "2026-06-24T10:00:00Z",
    excerpt: "Looking to give back to the community? Discover the ultimate guide to volunteering opportunities in Bangalore, how professionals and students can make a difference, and get involved today.",
    category: "Volunteering",
    mainImage: "/images/children3.jpg",
    authorName: "Khushi Kalpesh Joshi",
    authorRole: "Founder & Director",
    authorBio: "Founder of COMPASSION CREW. Dedicated to building a compassionate society, connecting students, professionals, and leaders across India to drive social impact.",
    body: JSON.stringify([
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Bangalore, known as the Silicon Valley of India, is not just a hub for technology and start-ups but also a thriving center for social impact. With hundreds of grassroots initiatives and social impact initiatives, volunteering has become an incredibly popular way for students, tech professionals, and citizens to contribute back to society. But how do you start? How do you find the right cause and balance it with a busy schedule?"
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Step 1: Understand Your Interests & Availability" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Volunteering is most impactful when it aligns with your skills and passions. If you love teaching, youth mentorship is perfect. If you love animals, stray animal rescue drives or shelter cleaning are a great fit. If you are a busy professional, look for organizations that offer flexible commitments (like 2–4 hours on weekends) so you don't burn out."
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Step 2: Research Local Bangalore Communities" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Look for registered, transparent communities. According to a 2024 survey on urban volunteerism trends reported by the ",
          },
          {
            _type: "span",
            text: "Times of India",
            marks: ["link-toi"]
          },
          {
            _type: "span",
            text: ", over 65% of young professionals in Bangalore actively seek weekend community service opportunities to offset occupational stress and build local social connections. Bangalore has communities like COMPASSION CREW that host structured volunteer campaigns, making it easy to sign up, participate in expert talks, and join ground operations directly. Verify that the community has clear goals, active projects, and a track record of transparent work."
          }
        ],
        markDefs: [
          {
            _key: "link-toi",
            _type: "link",
            href: "https://timesofindia.indiatimes.com"
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Step 3: Leverage Your Professional Skills" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "You don't just have to do physical labor; skills-based volunteering is highly valued. A CSR research report by the ",
          },
          {
            _type: "span",
            text: "NASSCOM Foundation",
            marks: ["link-nasscom"]
          },
          {
            _type: "span",
            text: " indicates that volunteer-driven corporate partnerships have grown by 40% in Karnataka since 2022. Tech professionals can help build websites, manage database systems, or handle online outreach. Students can help coordinate event logistics or run awareness campaigns. Utilizing your unique professional expertise can multiply the impact of your service."
          }
        ],
        markDefs: [
          {
            _key: "link-nasscom",
            _type: "link",
            href: "https://nasscomfoundation.org"
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Step 4: Commit and Maintain Consistency" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Communities run on predictability. Khushi Kalpesh Joshi, Founder & Director of COMPASSION CREW, explains: 'Bangalore's professionals want to give back, but they need frictionless, structured weekend programs that fit their schedule.' Even if you can only dedicate two hours a week, maintaining that schedule consistently is far more valuable than volunteering for 10 hours once and never returning. Set clear expectations with your coordinator and treat volunteer assignments with the same professionalism as your work. Interested in taking the first step? Complete our online ",
          },
          {
            _type: "span",
            text: "Volunteer Form",
            marks: ["link-vol-form"]
          },
          {
            _type: "span",
            text: " to join the crew!"
          }
        ],
        markDefs: [
          {
            _key: "link-vol-form",
            _type: "link",
            href: "/volunteer"
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Frequently Asked Questions (FAQ) about Volunteering in Bangalore" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Where can I find weekend volunteering drives in Bangalore?" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Communities like Compassion Crew host structured weekly volunteering drives in local Bangalore municipal schools, community shelters, and public parks, primarily on Saturday and Sunday mornings."
          }
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Can corporate employees do online or skills-based volunteering?" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Yes, software developers, marketing specialists, designers, and managers can volunteer remotely by supporting website development, data infrastructure, content writing, and CSR event coordination."
          }
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "How can college students get involved in Bangalore social work?" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "College students can join as student volunteer coordinators, helping lead ground operations, manage crowd control, register participants, and document projects for social media."
          }
        ]
      },
      {
        _type: "block",
        style: "blockquote",
        children: [
          {
            _type: "span",
            text: "Volunteering is a two-way street. While you serve communities in need, you build lifelong friendships, learn new leadership skills, and join a network of like-minded changemakers. Ready to make a difference? Visit our Volunteer page to get started!"
          }
        ]
      }
    ]),
    seoTitle: "How to Volunteer in Bangalore: The Ultimate Guide",
    seoDescription: "Looking to give back? Discover the ultimate guide to volunteering in Bangalore, community opportunities, and how tech professionals and students can participate.",
    keywords: ["volunteer Bangalore", "volunteer opportunities Bangalore", "community volunteer Bangalore", "how to volunteer Bangalore", "social impact Bangalore", "corporate volunteering Bangalore", "weekend volunteering Bangalore"],
  },
];

async function seed() {
  console.log("🌱 Seeding Neon PostgreSQL database...");

  // 1. Site Settings
  console.log("🌐 Seeding Site Settings...");
  await db.insert(siteSettings).values(siteSettingsToSeed).onConflictDoUpdate({
    target: siteSettings.id,
    set: siteSettingsToSeed,
  });

  // 2. Hero Section
  console.log("🔥 Seeding Hero Section...");
  await db.insert(heroSection).values(heroSectionToSeed).onConflictDoUpdate({
    target: heroSection.id,
    set: heroSectionToSeed,
  });

  // 3. CTA Section
  console.log("🎯 Seeding CTA Section...");
  await db.insert(ctaSection).values(ctaSectionToSeed).onConflictDoUpdate({
    target: ctaSection.id,
    set: ctaSectionToSeed,
  });

  // 4. Work Areas
  console.log("🛠 Seeding Work Areas...");
  for (const area of workAreasToSeed) {
    await db.insert(workAreas).values(area).onConflictDoUpdate({
      target: workAreas.id,
      set: area,
    });
  }

  // 5. Testimonials/Stories
  console.log("✍ Seeding Stories...");
  for (const story of storiesToSeed) {
    await db.insert(stories).values(story).onConflictDoUpdate({
      target: stories.id,
      set: story,
    });
  }

  // 6. Founder Page
  console.log("👩 Seeding Founder Page...");
  await db.insert(founderPage).values(founderPageToSeed).onConflictDoUpdate({
    target: founderPage.id,
    set: founderPageToSeed,
  });

  // 7. Volunteer Page
  console.log("🙋 Seeding Volunteer Page...");
  await db.insert(volunteerPage).values(volunteerPageToSeed).onConflictDoUpdate({
    target: volunteerPage.id,
    set: volunteerPageToSeed,
  });

  // 8. Donate Page
  console.log("💳 Seeding Donate Page...");
  await db.insert(donatePage).values(donatePageToSeed).onConflictDoUpdate({
    target: donatePage.id,
    set: donatePageToSeed,
  });

  // 9. Team Members
  console.log("👥 Seeding Team Members...");
  for (const member of teamMembersToSeed) {
    await db.insert(teamMembers).values(member).onConflictDoUpdate({
      target: teamMembers.id,
      set: member,
    });
  }

  // 10. Events
  console.log("📅 Seeding Events...");
  await db.delete(events);
  for (const eventData of eventsToSeed) {
    await db.insert(events).values(eventData).onConflictDoUpdate({
      target: events.id,
      set: eventData,
    });
  }

  // 11. Blogs
  console.log("📚 Seeding Blogs...");
  for (const blog of blogsToSeed) {
    await db.insert(blogs).values(blog).onConflictDoUpdate({
      target: blogs.id,
      set: blog,
    });
  }

  console.log("🎉 Seeding completed successfully!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
