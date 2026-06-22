/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const { createClient } = require("@sanity/client");

// Custom environment variables parser for .env.local
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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("❌ Error: Missing Sanity credentials in .env.local!");
  console.error("Please configure:");
  console.error("  - NEXT_PUBLIC_SANITY_PROJECT_ID");
  console.error("  - SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2023-01-01",
  token,
  useCdn: false, // Mutation needs to bypass CDN
});

const milestones = [
  { year: "2018", title: "Foundation", description: "COMPASSION CREW was founded with a mission to serve every life with dignity." },
  { year: "2019", title: "First State Expansion", description: "Extended operations to 5 states across India." },
  { year: "2020", title: "Pandemic Response", description: "Served 10,000+ families during COVID-19 crisis." },
  { year: "2021", title: "Women Centers", description: "Opened 10 skill development centers for women." },
  { year: "2022", title: "Animal Shelter", description: "Established our first dedicated animal rescue center." },
  { year: "2023", title: "Education Program", description: "Launched scholarship program for underprivileged children." },
];

const teamMembers = [
  {
    name: "Khushi Kalpesh Joshi",
    role: "Co-Founder & COO",
    bio: "Operations expert with 10+ years in NGO management. Leads our ground initiatives across India.",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
    email: "khushi@campasioncrew.org"
  },
  {
    name: "Bharath S",
    role: "Head of Programs",
    bio: "Development professional specializing in education and women's empowerment programs.",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
    email: "bharath@campasioncrew.org"
  },
  {
    name: "Bichitra Behera",
    role: "Animal Welfare Director",
    bio: "Veterinarian and animal rights activist. Heads our rescue and rehabilitation centers.",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
    email: "bichitra@campasioncrew.org"
  },
  {
    name: "RaviKiran",
    role: "Finance Director",
    bio: "CA with expertise in nonprofit financial management. Ensures transparency in all operations.",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
    email: "ravikiran@campasioncrew.org"
  },
  {
    name: "Shivam",
    role: "Communications Lead",
    bio: "Journalist turned communications expert. Tells our stories to inspire action.",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
    email: "shivam@campasioncrew.org"
  },
  {
    name: "Matharrishwa",
    role: "Volunteer Coordinator",
    bio: "Community builder managing our network of 500+ volunteers across 15 states.",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
    email: "matharrishwa@campasioncrew.org"
  },
];

const events = [
  {
    id: 1,
    title: "Expert Talk: Inspiring Social Changemakers",
    description: "Join us for an inspiring session with social leaders sharing practical knowledge on sustainable development and social entrepreneurship.",
    date: "October 10, 2026",
    time: "5:00 PM - 7:00 PM",
    location: "National Institute of Design, Bangalore",
    category: "Expert Talk",
    spots: 150,
  },
  {
    id: 2,
    title: "Community Connection: Local Action Meetup",
    description: "An interactive networking event to exchange ideas, connect with fellow changemakers, and discuss grassroots collaboration.",
    date: "November 14, 2026",
    time: "4:00 PM - 6:30 PM",
    location: "Community Center, Indiranagar, Bangalore",
    category: "Community Meetup",
    spots: 80,
  },
  {
    id: 3,
    title: "Volunteer Service Drive: Youth Mentorship Camp",
    description: "Contribute your time and skills by mentoring children from underserved communities in basic digital and creative skills.",
    date: "December 5, 2026",
    time: "10:00 AM - 3:00 PM",
    location: "Government High School, Bangalore",
    category: "Service Drive",
    spots: 50,
  },
  {
    id: 4,
    title: "Social Awareness Campaign: Sustainable Living",
    description: "A public campaign promoting sustainable lifestyle practices, zero-waste initiatives, and ecological responsibility.",
    date: "December 20, 2026",
    time: "9:00 AM - 1:00 PM",
    location: "Cubbon Park, Bangalore",
    category: "Campaign",
    spots: 120,
  },
  {
    id: 5,
    title: "Compassion Project Planning Workshop",
    description: "Co-create our future compassion initiatives focusing on child support, education assistance, and senior citizen welfare.",
    date: "January 15, 2027",
    time: "11:00 AM - 1:30 PM",
    location: "Online (Zoom)",
    category: "Workshop",
    spots: 250,
  },
];

const workAreas = [
  {
    id: "expert-talks",
    title: "Expert Talks & Knowledge Sessions",
    description: "Bringing industry experts, leaders, and changemakers together to share insights, experiences, and practical knowledge that inspire personal growth and social impact.",
    imagePath: "public/images/yoga.jpeg",
    number: "01",
  },
  {
    id: "community-events",
    title: "Community Engagement Events",
    description: "Interactive events that foster networking, collaboration, and meaningful discussions around social responsibility and personal development.",
    imagePath: "public/images/yoga2.jpeg",
    number: "02",
  },
  {
    id: "volunteer-initiatives",
    title: "Volunteer & Service Initiatives",
    description: "Structured opportunities for students, professionals, and changemakers to contribute their time and skills to support local community needs and social causes.",
    imagePath: "public/images/yoga3.png",
    number: "03",
  },
  {
    id: "awareness-campaigns",
    title: "Social Awareness Campaigns",
    description: "Programs designed to educate, discuss, and raise awareness about important social issues affecting communities and underserved groups.",
    imagePath: "public/images/yoga4.png",
    number: "04",
  },
  {
    id: "compassion-projects",
    title: "Compassion Projects",
    description: "Targeted impact initiatives focusing on future community support systems for children, senior citizens, education, and animal welfare.",
    imagePath: "public/images/yoga.jpeg",
    number: "05",
  },
];

const stories = [
  {
    quote: "COMPASSION CREW didn't just give me skills, they gave me confidence. Today, I run my own tailoring business and support my family with dignity.",
    name: "Lakshmi Devi",
    role: "Women Empowerment Program",
    location: "Rajasthan",
  },
  {
    quote: "My daughter now goes to school every day with a smile. The educational support changed not just her life, but our entire family's future.",
    name: "Mohammed Rafiq",
    role: "Children Education Program",
    location: "Kerala",
  },
  {
    quote: "When they rescued my street dog friend Bruno, I saw true compassion in action. They treat every animal with the love they deserve.",
    name: "Priya Sharma",
    role: "Animal Rescue Volunteer",
    location: "Mumbai",
  },
];

const stats = [
  { icon: "Heart", value: 50000, suffix: "+", label: "Lives Impacted" },
  { icon: "Users", value: 25000, suffix: "+", label: "Women Empowered" },
  { icon: "Baby", value: 15000, suffix: "+", label: "Children Educated" },
  { icon: "PawPrint", value: 10000, suffix: "+", label: "Animals Rescued" },
  { icon: "Award", value: 150, suffix: "", label: "Awards Won" },
  { icon: "Globe", value: 15, suffix: "+", label: "States Covered" },
];

const heroData = {
  eyebrow: "Social Impact Community",
  title: "Learn. Connect. *Contribute.*",
  description: "A community that empowers people to learn, connect, and contribute through expert talks, networking events, volunteering, and social campaigns.",
  primaryBtnText: "Get Involved",
  primaryBtnLink: "/volunteer",
  secondaryBtnText: "Learn More",
  secondaryBtnLink: "/about",
  imagePath: "public/images/yoga.jpeg"
};

const ctaData = {
  title: "Be Part of the Change",
  description: "Every contribution—whether your time, skills, or resources—helps us continue our mission of dignity and care for every life.",
  primaryBtnText: "Donate Now",
  primaryBtnLink: "/donate",
  secondaryBtnText: "Join as Volunteer",
  secondaryBtnLink: "/volunteer"
};

const founderData = {
  name: "Khushi Kalpesh Joshi",
  role: "Founder & Director",
  biography: [
    "Khushi Kalpesh Joshi founded COMPASSION CREW in 2018 with a simple yet profound vision: to build a compassionate society where individuals are empowered to learn, serve, and create meaningful change in their communities.",
    "With a heart that beats for service, Khushi has dedicated her life to creating platforms for connection and learning. Under her leadership, COMPASSION CREW has grown from a small initiative to a social impact movement connecting students, professionals, and leaders across India."
  ],
  imagePath: "public/images/founders.jpeg"
};

const volunteerData = {
  title: "Join Our Volunteer Team",
  description: "Thank you for your interest in volunteering with us. Please complete the application form below. We will review your submission and contact shortlisted applicants.",
  formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeYJ4-OKlvkBQm0vSaGKHMrNWHflIMaKZQKAQxeN73b7PFoUg/viewform?embedded=true",
  formHeight: 3600
};

const donateData = {
  title: "Support Our Mission - 80G Tax Deductible NGO Donations",
  description: "Your contribution directly supports our community events, expert talk sessions, volunteer initiatives, and future compassion projects. All donations are tax-deductible under Section 80G.",
  donationOptions: [
    { amount: 500, impact: "Sponsors workshop materials for 5 community participants" },
    { amount: 1000, impact: "Sponsors an online Expert Talk event session" },
    { amount: 2500, impact: "Supports organization and logistics of 1 volunteer service drive" },
    { amount: 5000, impact: "Sponsors digital learning resources and tools for youth development programs" },
  ],
  customAmountTitle: "Custom Amount",
  customAmountDesc: "Enter any amount you wish to contribute. Every rupee counts towards creating a better world.",
  taxNote: "All donations are tax-deductible under Section 80G. You will receive an official tax receipt via email."
};

const siteSettingsData = {
  email: "contact@compassioncrew.in",
  phone: "+91 8884156247",
  address: "Bangalore, Karnataka, India",
  footerDescription: "Dignity, care, and equal value for every life. Supporting women, children, and animals across India.",
  copyrightText: "COMPASSION CREW. All rights reserved."
};

async function uploadImageAsset(localPath) {
  const fullPath = path.join(__dirname, "..", localPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠ Warning: Local image not found at ${fullPath}. Skipping image upload.`);
    return null;
  }
  const fileStream = fs.createReadStream(fullPath);
  return await client.assets.upload("image", fileStream, {
    filename: path.basename(fullPath),
  });
}

async function seedData() {
  try {
    console.log("🚀 Starting data migration seeding to Sanity CMS...");

    // 1. Seed Milestones
    console.log("\n📅 Seeding Milestones...");
    for (let i = 0; i < milestones.length; i++) {
      const ms = milestones[i];
      const doc = {
        _id: `milestone-${i}`,
        _type: "milestone",
        year: ms.year,
        title: ms.title,
        description: ms.description,
      };
      await client.createOrReplace(doc);
      console.log(`  ✔ Seeded milestone: ${ms.year} - ${ms.title}`);
    }

    // 2. Seed Team Members
    console.log("\n👥 Seeding Team Members...");
    for (let i = 0; i < teamMembers.length; i++) {
      const tm = teamMembers[i];
      const doc = {
        _id: `team-member-${i}`,
        _type: "teamMember",
        name: tm.name,
        role: tm.role,
        bio: tm.bio,
        linkedin: tm.linkedin,
        x: tm.x,
        email: tm.email,
      };
      await client.createOrReplace(doc);
      console.log(`  ✔ Seeded team member: ${tm.name}`);
    }

    // 3. Seed Events
    console.log("\n🎉 Seeding Events...");
    for (let i = 0; i < events.length; i++) {
      const ev = events[i];
      const doc = {
        _id: `event-${ev.id}`,
        _type: "event",
        title: ev.title,
        description: ev.description,
        date: ev.date,
        time: ev.time,
        location: ev.location,
        category: ev.category,
        spots: ev.spots,
      };
      await client.createOrReplace(doc);
      console.log(`  ✔ Seeded event: ${ev.title}`);
    }

    // 4. Seed Stories
    console.log("\n✍ Seeding Real Stories...");
    for (let i = 0; i < stories.length; i++) {
      const st = stories[i];
      const doc = {
        _id: `story-${i}`,
        _type: "story",
        quote: st.quote,
        name: st.name,
        role: st.role,
        location: st.location,
        approved: true,
      };
      await client.createOrReplace(doc);
      console.log(`  ✔ Seeded story: ${st.name}`);
    }

    // 5. Seed Impact Stats
    console.log("\n📊 Seeding Impact Stats...");
    for (let i = 0; i < stats.length; i++) {
      const stat = stats[i];
      const doc = {
        _id: `impact-stat-${i}`,
        _type: "impactStat",
        icon: stat.icon,
        value: stat.value,
        suffix: stat.suffix,
        label: stat.label,
      };
      await client.createOrReplace(doc);
      console.log(`  ✔ Seeded impact stat: ${stat.label}`);
    }

    // 6. Seed Work Areas
    console.log("\n🛠 Seeding Work Areas...");
    for (let i = 0; i < workAreas.length; i++) {
      const area = workAreas[i];
      const imageAsset = await uploadImageAsset(area.imagePath);
      
      const doc = {
        _id: `work-area-${area.id}`,
        _type: "workArea",
        id: area.id,
        number: area.number,
        title: area.title,
        description: area.description,
      };

      if (imageAsset) {
        doc.image = {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        };
      }

      await client.createOrReplace(doc);
      console.log(`  ✔ Seeded work area: ${area.title}`);
    }

    // 7. Seed Hero Section
    console.log("\n🔥 Seeding Hero Section...");
    const heroAsset = await uploadImageAsset(heroData.imagePath);
    const heroDoc = {
      _id: "singleton-heroSection",
      _type: "heroSection",
      eyebrow: heroData.eyebrow,
      title: heroData.title,
      description: heroData.description,
      primaryBtnText: heroData.primaryBtnText,
      primaryBtnLink: heroData.primaryBtnLink,
      secondaryBtnText: heroData.secondaryBtnText,
      secondaryBtnLink: heroData.secondaryBtnLink,
    };
    if (heroAsset) {
      heroDoc.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: heroAsset._id,
        },
      };
    }
    await client.createOrReplace(heroDoc);
    console.log("  ✔ Seeded Hero Section settings");

    // 8. Seed CTA Section
    console.log("\n🎯 Seeding CTA Section...");
    const ctaDoc = {
      _id: "singleton-ctaSection",
      _type: "ctaSection",
      title: ctaData.title,
      description: ctaData.description,
      primaryBtnText: ctaData.primaryBtnText,
      primaryBtnLink: ctaData.primaryBtnLink,
      secondaryBtnText: ctaData.secondaryBtnText,
      secondaryBtnLink: ctaData.secondaryBtnLink,
    };
    await client.createOrReplace(ctaDoc);
    console.log("  ✔ Seeded CTA Section settings");

    // 9. Seed Founder Page
    console.log("\n👩 Seeding Founder Page...");
    const founderAsset = await uploadImageAsset(founderData.imagePath);
    const founderDoc = {
      _id: "singleton-founderPage",
      _type: "founderPage",
      name: founderData.name,
      role: founderData.role,
      biography: founderData.biography,
    };
    if (founderAsset) {
      founderDoc.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: founderAsset._id,
        },
      };
    }
    await client.createOrReplace(founderDoc);
    console.log("  ✔ Seeded Founder Page settings");

    // 10. Seed Volunteer Page
    console.log("\n🙋 Seeding Volunteer Page...");
    const volunteerDoc = {
      _id: "singleton-volunteerPage",
      _type: "volunteerPage",
      title: volunteerData.title,
      description: volunteerData.description,
      formUrl: volunteerData.formUrl,
      formHeight: volunteerData.formHeight,
    };
    await client.createOrReplace(volunteerDoc);
    console.log("  ✔ Seeded Volunteer Page settings");

    // 11. Seed Donate Page
    console.log("\n💳 Seeding Donate Page...");
    const donateDoc = {
      _id: "singleton-donatePage",
      _type: "donatePage",
      title: donateData.title,
      description: donateData.description,
      donationOptions: donateData.donationOptions,
      customAmountTitle: donateData.customAmountTitle,
      customAmountDesc: donateData.customAmountDesc,
      taxNote: donateData.taxNote,
    };
    await client.createOrReplace(donateDoc);
    console.log("  ✔ Seeded Donate Page settings");

    // 12. Seed Site Global Settings
    console.log("\n🌐 Seeding Site Global Settings...");
    const settingsDoc = {
      _id: "singleton-siteSettings",
      _type: "siteSettings",
      email: siteSettingsData.email,
      phone: siteSettingsData.phone,
      address: siteSettingsData.address,
      footerDescription: siteSettingsData.footerDescription,
      copyrightText: siteSettingsData.copyrightText,
    };
    await client.createOrReplace(settingsDoc);
    console.log("  ✔ Seeded Site Global Settings");

    console.log("\n🎉 All data successfully migrated to Sanity CMS! 🎉");
  } catch (err) {
    console.error("\n❌ Seeding failed with error:", err);
  }
}

seedData();
