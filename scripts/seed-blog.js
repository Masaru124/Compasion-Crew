/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const { createClient } = require("@sanity/client");

// Parse environment variables from .env.local
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
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2023-01-01",
  token,
  useCdn: false,
});

async function uploadImageAsset(localPath) {
  const fullPath = path.join(__dirname, "..", localPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠ Warning: Local image not found at ${fullPath}.`);
    return null;
  }
  const fileStream = fs.createReadStream(fullPath);
  return await client.assets.upload("image", fileStream, {
    filename: path.basename(fullPath),
  });
}

const bodyContent = [
  {
    _key: "block1",
    _type: "block",
    style: "normal",
    children: [
      {
        _key: "span1",
        _type: "span",
        text: "Creating a lasting social impact is one of the most rewarding endeavors an individual or organization can undertake. However, true change goes beyond quick fixes or temporary charity. It requires a systematic, empathetic, and structured approach to address the root causes of societal gaps."
      }
    ]
  },
  {
    _key: "block2",
    _type: "block",
    style: "h2",
    children: [
      {
        _key: "span2",
        _type: "span",
        text: "Step 1: Identify the Root Problem & Define Your Cause"
      }
    ]
  },
  {
    _key: "block3",
    _type: "block",
    style: "normal",
    children: [
      {
        _key: "span3",
        _type: "span",
        text: "Before launching any social campaign, it is vital to research and map out the community. Many programs fail because they address symptoms rather than the disease. Spend time listening to community members, gathering quantitative data, and mapping out structural issues."
      }
    ]
  },
  {
    _key: "block4",
    _type: "block",
    style: "h2",
    children: [
      {
        _key: "span4",
        _type: "span",
        text: "Step 2: Establish Clear, Measurable Goals"
      }
    ]
  },
  {
    _key: "block5",
    _type: "block",
    style: "normal",
    children: [
      {
        _key: "span5",
        _type: "span",
        text: "A vague mission statement like 'helping children' makes it hard to coordinate resources. Instead, set Specific, Measurable, Achievable, Relevant, and Time-bound (SMART) goals. For example: 'Provide weekly basic digital literacy mentorship to 50 children in the Cubbon Park locality by December 2026.'"
      }
    ]
  },
  {
    _key: "block6",
    _type: "block",
    style: "h2",
    children: [
      {
        _key: "span6",
        _type: "span",
        text: "Step 3: Design Sustainable, Empowerment-Focused Solutions"
      }
    ]
  },
  {
    _key: "block7",
    _type: "block",
    style: "normal",
    children: [
      {
        _key: "span7",
        _type: "span",
        text: "Charity provides temporary relief, but empowerment builds resilience. Focus on programs that teach skills, build infrastructure, or provide resource pathways that allow beneficiaries to ultimately support themselves. Co-create solutions with the local community to foster ownership."
      }
    ]
  },
  {
    _key: "block8",
    _type: "block",
    style: "h2",
    children: [
      {
        _key: "span8",
        _type: "span",
        text: "Step 4: Build a Dedicated Team and Partner Network"
      }
    ]
  },
  {
    _key: "block9",
    _type: "block",
    style: "normal",
    children: [
      {
        _key: "span9",
        _type: "span",
        text: "No single person can create systemic change alone. Connect with local volunteers, corporate partners, and other NGOs. COMPASSION CREW, for instance, thrives because of a strong network of coordinators and passionate volunteers who share a unified vision."
      }
    ]
  },
  {
    _key: "block10",
    _type: "block",
    style: "h2",
    children: [
      {
        _key: "span10",
        _type: "span",
        text: "Step 5: Mobilize Resources & Maintain Legal Compliance"
      }
    ]
  },
  {
    _key: "block11",
    _type: "block",
    style: "normal",
    children: [
      {
        _key: "span11",
        _type: "span",
        text: "Structure your fundraising, logistics, and legal compliance. Transparency builds trust. If you are operating a registered NGO in India, offering benefits like 80G tax deductions helps mobilize corporate and individual donations that fuel ground operations."
      }
    ]
  },
  {
    _key: "block12",
    _type: "block",
    style: "h2",
    children: [
      {
        _key: "span12",
        _type: "span",
        text: "Step 6: Execute with Empathy & Continuous Feedback"
      }
    ]
  },
  {
    _key: "block13",
    _type: "block",
    style: "normal",
    children: [
      {
        _key: "span13",
        _type: "span",
        text: "Implementation is where plans meet reality. Maintain a feedback loop with the community you serve. Be flexible enough to alter strategies based on ground experiences, while staying firm on the overall mission."
      }
    ]
  },
  {
    _key: "block14",
    _type: "block",
    style: "h2",
    children: [
      {
        _key: "span14",
        _type: "span",
        text: "Step 7: Measure, Document, and Scale Impact"
      }
    ]
  },
  {
    _key: "block15",
    _type: "block",
    style: "normal",
    children: [
      {
        _key: "span15",
        _type: "span",
        text: "Collect data continually. Document before-and-after conditions, write case studies, and record quantitative stats (e.g. lives impacted, children educated). Share these stories with your network to attract more support and scale your initiatives to other regions."
      }
    ]
  },
  {
    _key: "block16",
    _type: "block",
    style: "blockquote",
    children: [
      {
        _key: "span16",
        _type: "span",
        text: "True compassion is not just feeling empathy, but having the courage and structure to act on it. — Khushi Kalpesh Joshi"
      }
    ]
  }
];

async function seedBlog() {
  try {
    console.log("🚀 Seeding initial blog post to Sanity CMS...");

    const imageAsset = await uploadImageAsset("public/images/social_impact_blog.png");
    if (!imageAsset) {
      console.error("❌ Error: Image upload failed.");
      return;
    }

    const doc = {
      _id: "blog-post-creating-lasting-social-impact",
      _type: "post",
      title: "Creating Lasting Social Impact: A Step-by-Step Approach",
      slug: {
        _type: "slug",
        current: "creating-lasting-social-impact-step-by-step",
      },
      author: {
        _type: "reference",
        _ref: "team-member-0", // Reference to Khushi Kalpesh Joshi
      },
      mainImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      },
      publishedAt: new Date().toISOString(),
      excerpt: "Discover a structured, actionable guide to making a sustainable social impact, from defining your core cause to measuring and scaling your efforts for long-term community benefits.",
      category: "Social Impact",
      body: bodyContent,
      seoTitle: "Creating Lasting Social Impact: A Step-by-Step Approach",
      seoDescription: "A structured, actionable guide to making a sustainable social impact, from defining your cause to measuring and scaling your efforts.",
      keywords: ["social impact", "community development", "sustainable volunteering", "NGO Bangalore", "social change guide"],
    };

    await client.createOrReplace(doc);
    console.log("✔ Successfully seeded the first blog post!");
  } catch (error) {
    console.error("❌ Seeding failed with error:", error);
  }
}

seedBlog();
