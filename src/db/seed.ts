import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as fs from "fs";
import * as path from "path";
import { events } from "./schema";

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

const eventsToSeed = [
  {
    id: "event-1",
    title: "Expert Talk: Inspiring Social Changemakers",
    description: "Join us for an inspiring session with social leaders sharing practical knowledge on sustainable development and social entrepreneurship.",
    date: "2026-10-10",
    time: "17:00 - 19:00",
    location: "National Institute of Design, Bangalore",
    category: "Expert Talk",
    spots: 150,
    image: "/images/yoga.jpeg",
    isPast: false,
    registrationOpen: true,
    details: "Learn how to structure your projects, pitch to donors, build volunteer programs, and maintain legal compliance under Section 80G tax exemptions in India.",
    gallery: ["/images/yoga2.jpeg", "/images/yoga3.png"],
  },
  {
    id: "event-2",
    title: "Community Connection: Local Action Meetup",
    description: "An interactive networking event to exchange ideas, connect with fellow changemakers, and discuss grassroots collaboration.",
    date: "2026-11-14",
    time: "16:00 - 18:30",
    location: "Community Center, Indiranagar, Bangalore",
    category: "Community Meetup",
    spots: 80,
    image: "/images/children1.jpg",
    isPast: false,
    registrationOpen: true,
    details: "Let's discuss how we can leverage technology, build volunteer portals, and design local impact initiatives for education and animal welfare.",
    gallery: ["/images/children2.jpg"],
  },
  {
    id: "event-3",
    title: "Volunteer Service Drive: Youth Mentorship Camp",
    description: "Contribute your time and skills by mentoring children from underserved communities in basic digital and creative skills.",
    date: "2026-12-05",
    time: "10:00 - 15:00",
    location: "Government High School, Bangalore",
    category: "Service Drive",
    spots: 50,
    image: "/images/children3.jpg",
    isPast: false,
    registrationOpen: true,
    details: "A day of sharing, teaching, and fun! We will teach children basic computer usage, painting, and host group games. Materials will be provided.",
    gallery: ["/images/children4.jpg"],
  },
  {
    id: "event-4",
    title: "Social Awareness Campaign: Sustainable Living",
    description: "A public campaign promoting sustainable lifestyle practices, zero-waste initiatives, and ecological responsibility.",
    date: "2026-12-20",
    time: "09:00 - 13:00",
    location: "Cubbon Park, Bangalore",
    category: "Campaign",
    spots: 120,
    image: "/images/children5.jpg",
    isPast: false,
    registrationOpen: true,
    details: "Join us for clean-up walks, eco-awareness charts, and distributions of reusable bags to park visitors. Let's make Bangalore greener!",
    gallery: ["/images/children1.jpg"],
  },
  {
    id: "event-5",
    title: "Compassion Project Planning Workshop",
    description: "Co-create our future compassion initiatives focusing on child support, education assistance, and senior citizen welfare.",
    date: "2027-01-15",
    time: "11:00 - 13:30",
    location: "Online (Zoom)",
    category: "Workshop",
    spots: 250,
    image: "/images/yoga4.png",
    isPast: false,
    registrationOpen: true,
    details: "A virtual planning workshop to outline our 2027 roadmap. Learn how to pitch, request, and execute grassroots projects in your own city.",
    gallery: ["/images/yoga3.png"],
  },
];

async function seed() {
  console.log("🌱 Seeding events to database...");
  for (const eventData of eventsToSeed) {
    // Drizzle neon-http helper uses schema ORM for insertion
    await db.insert(events).values(eventData).onConflictDoUpdate({
      target: events.id,
      set: eventData,
    });
    console.log(`  ✔ Seeded event: ${eventData.title}`);
  }
  console.log("🎉 Seeding completed successfully!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
