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

Date: 12th November 2026 | Time: 08:30 AM – 09:30 PM | Venue: AMC Engineering College, Bengaluru
Organized by: Department of Computer Science and Engineering (Data Science), AMC Engineering College, Bengaluru
Registration Link: https://forms.gle/53PRUzuHc9Vriyyq5

🏆 PRIZE POOL: ₹60,000
Compete for a total cash prize pool of ₹60,000 alongside prestigious trophies, certificates of excellence, and category-wise awards!

WELCOME & THEME:
Code Spark 2026 is an intense, high-energy hackathon bringing together passionate student innovators, developers, designers, and problem-solvers to ideate, collaborate, and build technology-driven solutions for real-world challenges across AI, Machine Learning, Data Science, Web Development, and Emerging Technologies.

Tracks & Focus Areas:
• Artificial Intelligence & Machine Learning
• Data Science & Predictive Analytics
• Web Development & Scalable Cloud Systems
• Emerging Technologies & Smart Innovations

WHY PARTICIPATE?
• ₹60,000 Prize Pool & Awards: Compete for a grand total cash prize pool of ₹60,000, prestigious trophies, merit certificates, and institutional recognition.
• Showcase Your Skills: Demonstrate your technical expertise and problem-solving prowess before a panel of industry veterans and academic evaluators.
• Innovate & Collaborate: Team up with passionate peers and network with fellow student changemakers and mentors.
• Build Practical Solutions: Take an idea from concept to prototype, crafting viable applications that solve tangible problems.
• Gain Hackathon Experience: Hone your agile development, time management, and presentation pitch skills in a competitive environment.

EVENT TIMELINE & DETAILED SCHEDULE:
• 08:30 AM – 09:00 AM: Registration & Check-in
  Participant verification, ID cards and welcome kits
• 09:00 AM – 09:20 AM: Inaugural Ceremony
  Welcome address, dignitary introductions and inauguration
• 09:20 AM – 09:40 AM: Event Briefing
  Introduction, rules, problem statements, tracks and judging criteria
• 09:40 AM: Hackathon Begins
  Official commencement of coding
• 09:40 AM – 01:00 PM: Hacking Session – Phase 1
  Ideation, planning and development
• 01:00 PM – 02:00 PM: Lunch Break
  Lunch and networking
• 02:00 PM – 04:00 PM: Hacking Session – Phase 2
  Development and mentor interactions
• 04:00 PM – 04:30 PM: Evening Snacks
  Tea, coffee and refreshments
• 04:30 PM – 05:30 PM: Final Hacking Session
  Testing, debugging and documentation
• 05:30 PM: Final Submission Deadline
  Submission of project, source code and presentation
• 05:30 PM – 06:15 PM: Initial Evaluation
  Project screening and finalist shortlisting
• 06:15 PM – 07:30 PM: Finalist Presentations
  Project demonstrations before the judging panel
• 07:30 PM – 08:15 PM: Dinner Break
  Dinner for participants and organizing team
• 08:15 PM – 08:50 PM: Judges' Deliberation
  Final scoring and result verification
• 08:50 PM – 09:00 PM: Winners Announcement & Recognition
  Declaration of winners and award recognition
• 09:00 PM – 09:30 PM: Vote of Thanks & Closing Ceremony
  Acknowledgements, sponsor recognition and formal conclusion

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
      "A high-energy hackathon with an exciting ₹60,000 prize pool, bringing together passionate student innovators, developers, and problem-solvers to build technology-driven solutions to real-world challenges. Organized by the Department of Computer Science and Engineering (Data Science), AMC Engineering College, Bengaluru.",
    date: "2026-11-12",
    time: "08:30 - 21:30",
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
  console.log("⚡ Upserting CODE SPARK 2026 with new timing (08:30 - 21:30) and updated detailed activities...");
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

  // 3. Verify event in DB
  const [updatedCodeSpark] = await db
    .select()
    .from(events)
    .where(eq(events.id, "event-code-spark-2026"));
  console.log("\n📋 Updated CODE SPARK in Neon DB:");
  console.log(`- Title: ${updatedCodeSpark.title}`);
  console.log(`- Time: ${updatedCodeSpark.time}`);
  console.log(`- Schedule includes 08:30 AM: ${updatedCodeSpark.details?.includes("08:30 AM")}`);
  console.log(`- Schedule includes 09:30 PM: ${updatedCodeSpark.details?.includes("09:30 PM")}`);
}

main().catch((err) => {
  console.error("❌ Error updating DB:", err);
  process.exit(1);
});
