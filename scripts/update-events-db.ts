import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as fs from "fs";
import * as path from "path";
import { events } from "../db/schema";
import { eq } from "drizzle-orm";

// Load .env.local
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
  console.error("❌ DATABASE_URL missing");
  process.exit(1);
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

async function main() {
  console.log("🚀 Updating database events...");

  const codeSparkDetails = `DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING (DATA SCIENCE), AMC ENGINEERING COLLEGE PRESENTS:
CODE SPARK 2026 — INNOVATE, COLLABORATE, AND BUILD SOLUTIONS THAT MATTER

Date: 12th November 2026 | Time: 09:00 AM – 09:00 PM | Venue: AMC Engineering College, Bengaluru
Organized by: Department of Computer Science and Engineering (Data Science), AMC Engineering College, Bengaluru
Registration Link: https://forms.gle/53PRUzuHc9Vriyyq5

WELCOME & THEME:
Code Spark 2026 is an intense, high-energy hackathon bringing together passionate student innovators, developers, designers, and problem-solvers to ideate, collaborate, and build technology-driven solutions for real-world challenges across AI, Machine Learning, Data Science, Web Development, and Emerging Technologies.

Tracks & Focus Areas:
• Artificial Intelligence & Machine Learning
• Data Science & Predictive Analytics
• Web Development & Scalable Cloud Systems
• Emerging Technologies & Smart Innovations

WHY PARTICIPATE?
• Showcase Your Skills: Demonstrate your technical expertise and problem-solving prowess before a panel of industry veterans and academic evaluators.
• Innovate & Collaborate: Team up with passionate peers and network with fellow student changemakers and mentors.
• Build Practical Solutions: Take an idea from concept to prototype, crafting viable applications that solve tangible problems.
• Gain Hackathon Experience: Hone your agile development, time management, and presentation pitch skills in a competitive environment.
• Win Prizes & Recognition: Compete for prestigious awards, cash prizes, merit certificates, and institutional recognition.

EVENT TIMELINE & DETAILED SCHEDULE:
• 09:00 AM – 09:30 AM: Registration & Participant Check-in
• 09:30 AM – 10:00 AM: Inauguration Ceremony
• 10:00 AM – 10:15 AM: Rules, Guidelines & Problem Statement Briefing
• 10:15 AM: Official Hackathon Begins
• 10:15 AM – 01:00 PM: Hacking Session – Phase 1
• 01:00 PM – 02:00 PM: Lunch Break
• 02:00 PM – 04:00 PM: Hacking Session – Phase 2 & Mentorship
• 04:00 PM – 04:30 PM: Evening Snacks & Refreshments
• 04:30 PM – 05:30 PM: Final Hacking Session, Testing & Documentation
• 05:30 PM: Deadline – Final Project Submission
• 05:30 PM – 06:15 PM: Initial Evaluation & Finalist Shortlisting
• 06:15 PM – 07:30 PM: Finalist Presentations & Project Demonstrations
• 07:30 PM – 08:00 PM: Dinner Break
• 08:00 PM – 08:20 PM: Judges' Deliberation & Result Finalization
• 08:20 PM – 08:50 PM: Winner Announcement, Prize Distribution & Certificates
• 08:50 PM – 09:00 PM: Vote of Thanks & Closing Ceremony

REGISTRATION GUIDELINES & INSTRUCTIONS:
• Team Size: Student teams (check form for team composition options).
• Early-Bird Registration Fee: ₹600 per team.
• Registration Steps:
  1. Fill out the official Google Form registration: https://forms.gle/53PRUzuHc9Vriyyq5
  2. Provide complete team and member details (names, emails, phone numbers, institution).
  3. Complete the registration fee payment through the official process communicated in the form.
  4. Submit payment reference details for official verification and registration confirmation.

TAGLINE:
Think. Build. Innovate. See you at CODE SPARK 2026!`;

  const codeSparkEvent = {
    id: "event-code-spark-2026",
    title: "CODE SPARK 2026",
    description:
      "A high-energy hackathon bringing together passionate student innovators, developers, and problem-solvers to build technology-driven solutions to real-world challenges. Organized by the Department of Computer Science and Engineering (Data Science), AMC Engineering College, Bengaluru.",
    date: "2026-11-12",
    time: "09:00 - 21:00",
    location: "AMC Engineering College, Bengaluru",
    category: "Hackathon",
    spots: 200,
    image: "/images/code_spark_2026.png",
    isPast: false,
    registrationOpen: true,
    registrationUrl: "https://forms.gle/53PRUzuHc9Vriyyq5",
    details: codeSparkDetails,
    gallery: [],
  };

  // 1. Upsert CODE SPARK 2026
  console.log("⚡ Upserting CODE SPARK 2026 with updated timing & detailed timeline...");
  await db
    .insert(events)
    .values(codeSparkEvent)
    .onConflictDoUpdate({
      target: events.id,
      set: codeSparkEvent,
    });
  console.log("✅ CODE SPARK 2026 inserted/upserted successfully!");

  // 2. Ensure COLLEGE TO CORPORATE is past event
  await db
    .update(events)
    .set({
      isPast: true,
      registrationOpen: false,
    })
    .where(eq(events.id, "event-college-to-corporate"));

  // 3. Verify events in DB
  const allEvents = await db.select().from(events);
  console.log("\n📋 Current Events in Neon DB:");
  allEvents.forEach((ev) => {
    console.log(
      `- [${ev.id}] "${ev.title}" | time: ${ev.time} | isPast: ${ev.isPast} | regOpen: ${ev.registrationOpen} | date: ${ev.date}`
    );
  });
}

main().catch((err) => {
  console.error("❌ Error updating DB:", err);
  process.exit(1);
});
