import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";
import { blogs } from "../src/db/schema";

const envLocalPath = path.join(__dirname, "..", ".env.local");
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
  console.error("DATABASE_URL is missing!");
  process.exit(1);
}
const sql = neon(databaseUrl);
const db = drizzle(sql);

const blog1Body = [
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
        text: "While charitable donations and emergency relief drives are critical during crises, they are transactional. Once resources are consumed, the beneficiaries often return to their initial state of vulnerability. Systemic change, on the other hand, reorganizes the structures that created the problem. This means investing in skill development, education, and local infrastructure. By changing the framework from giving assistance to building agency, we empower individuals to shape their own futures.",
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
        text: "Before launching any social campaign, it is vital to research and map out the community. Many programs fail because they address symptoms rather than the disease. Spend time listening to community members, gathering quantitative data, and mapping out structural issues. At COMPASSION CREW, we begin every project by visiting the neighborhood, interviewing families, and aligning our goals with their self-identified needs.",
      }
    ]
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
        text: "A vague mission statement like 'helping children' makes it hard to coordinate resources. Instead, set Specific, Measurable, Achievable, Relevant, and Time-bound (SMART) goals. For example: 'Provide weekly basic digital literacy mentorship to 50 children in the Bangalore municipal schools by December 2026.' Clear goals enable volunteer coordinators to design precise lesson plans and track progress.",
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
        text: "Focus on programs that teach skills, build infrastructure, or provide resource pathways that allow beneficiaries to ultimately support themselves. Co-create solutions with the local community to foster ownership. Whether it is vocational tailoring for women, digital workshops for youth, or animal welfare awareness, the ultimate goal should be self-reliance.",
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
        text: "No single person can create systemic change alone. Connect with local volunteers, corporate partners, and other NGOs. COMPASSION CREW, for instance, thrives because of a strong network of coordinators and passionate volunteers who share a unified vision. Utilizing platforms like iVolunteer or Youth for Seva helps aggregate community talent for maximum collective impact.",
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
        text: "Structure your fundraising, logistics, and legal compliance. Transparency builds trust. If you are operating a registered NGO in India, offering tax benefits like 80G tax deductions helps mobilize corporate and individual donations that fuel ground operations. Be completely transparent with your financial statements and regularly publish impact assessment logs.",
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
        text: "Collect data continually. Document before-and-after conditions, write case studies, and record quantitative stats (e.g. lives impacted, children educated). Share these stories with your network to attract more support. Once a model is proven successful in one Bangalore neighborhood, codify the processes and scale it to other locations across Karnataka and India.",
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
    children: [{ _type: "span", text: "What makes an NGO program sustainable?" }]
  },
  {
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        text: "Sustainability is achieved when the community actively participates in program execution and the focus is on skill building rather than handouts. Secure, transparent funding models (like 80G-eligible individual contributions) also ensure operational longevity."
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
];

const blog2Body = [
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
        text: "Research shows that volunteering helps reduce stress, combat depression, and keep you physically active. The sense of purpose that comes from serving others activates reward centers in the brain, creating a psychological phenomenon known as the 'helper's high.' This biological reaction releases endorphins and oxytocin, which lower blood pressure and boost emotional resilience. Regular volunteering helps combat feelings of loneliness and isolation, particularly for young professionals moving to major metropolitan areas like Bangalore.",
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
        text: "In a world increasingly marked by digital isolation, volunteering brings together people from different backgrounds who share a common purpose. You build deep connections, professional networks, and lifelong friendships with fellow changemakers. Working side-by-side with others to paint a classroom, host an educational workshop, or coordinate shelter logistics breaks down social barriers and builds mutual trust. These shared experiences form the foundation of a cohesive, supportive local community.",
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
        text: "Volunteering acts as a leadership laboratory. It allows you to develop project management, public speaking, conflict resolution, and cross-functional coordination skills outside your regular workspace. For students and young graduates, it provides practical on-ground experience that is highly valued by universities and employers. Empathy and active listening, developed through community service, are critical traits of highly effective modern leaders.",
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
        text: "Consistency is far more important than quantity. Committing just 2 hours a week or 8 hours a month allows NGOs to coordinate events smoothly and builds reliable, long-term relationships with beneficiaries."
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
];

const blog3Body = [
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
        text: "Schools teach standard curricula, but they rarely prepare children for the digital-first economy or teach critical thinking. Underfunded public schools often lack computer labs, individual attention, and extracurricular exposure. Mentorship programs match students with working professionals who can teach coding, public speaking, science concepts, and basic financial literacy. These skills open up new horizons that go beyond standard textbook reading.",
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
        text: "Mentorship is not just about academic tutoring; it is about building confidence and expanding aspirations. Many children from low-income communities have never met a software engineer, a doctor, or an entrepreneur. Meeting a mentor who shows interest in their future helps children dream bigger. It gives them the emotional and social backing to pursue higher education and professional careers that previously felt out of reach. By providing encouragement, a mentor alters a child's self-image from one of limitation to one of possibility.",
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
        text: "You don't need to be a professional teacher to make a difference. Spending just a few hours a month teaching basic computer literacy, playing creative games, or reading stories to children can completely transform their learning trajectory. Consistency is key—showing up regularly builds trust and shows these children that their growth matters. If you are unable to volunteer your time, you can also support our learning centers through a tax-deductible ",
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
];

const blog4Body = [
  {
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        text: "Bangalore, known as the Silicon Valley of India, is not just a hub for technology and start-ups but also a thriving center for social impact. With hundreds of grassroots initiatives and registered NGOs, volunteering has become an incredibly popular way for students, tech professionals, and citizens to contribute back to society. But how do you start? How do you find the right cause and balance it with a busy schedule?"
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
    children: [{ _type: "span", text: "Step 2: Research Local Bangalore NGOs" }]
  },
  {
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        text: "Look for registered, transparent NGOs. Bangalore has communities like COMPASSION CREW that host structured volunteer campaigns, making it easy to sign up, participate in expert talks, and join ground operations directly. Verify that the NGO has clear goals, tax exemption statuses (like Section 80G eligibility for donors), and a track record of transparent work."
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
        text: "You don't just have to do physical labor; skills-based volunteering is highly valued. Tech professionals can help build websites, manage database systems, or handle online outreach. Students can help coordinate event logistics or run awareness campaigns. Utilizing your unique professional expertise can multiply the impact of your service."
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
        text: "NGOs run on predictability. Even if you can only dedicate two hours a week, maintaining that schedule consistently is far more valuable than volunteering for 10 hours once and never returning. Set clear expectations with your coordinator and treat volunteer assignments with the same professionalism as your work. Interested in taking the first step? Complete our online ",
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
        text: "NGOs like Compassion Crew host structured weekly volunteering drives in local Bangalore municipal schools, community shelters, and public parks, primarily on Saturday and Sunday mornings."
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
];

async function updateDb() {
  const data = [
    { id: "blog-1", body: JSON.stringify(blog1Body) },
    { id: "blog-2", body: JSON.stringify(blog2Body) },
    { id: "blog-3", body: JSON.stringify(blog3Body) },
    { id: "blog-4", body: JSON.stringify(blog4Body) }
  ];

  for (const entry of data) {
    console.log(`Writing direct style override to database for ${entry.id}...`);
    await db.update(blogs).set({
      body: entry.body
    }).where(eq(blogs.id, entry.id));
  }
  console.log("Direct style override completed successfully!");
}

updateDb().catch(console.error);
