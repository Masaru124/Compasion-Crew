import { pgTable, text, integer, boolean } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  location: text("location").notNull(),
  category: text("category").notNull(),
  spots: integer("spots").notNull().default(0),
  image: text("image"),
  isPast: boolean("is_past").notNull().default(false),
  registrationOpen: boolean("registration_open").notNull().default(true),
  details: text("details"),
  gallery: text("gallery").array(),
});

export const siteSettings = pgTable("site_settings", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  footerDescription: text("footer_description").notNull(),
  copyrightText: text("copyright_text"),
});

export const heroSection = pgTable("hero_section", {
  id: text("id").primaryKey(),
  eyebrow: text("eyebrow").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  primaryBtnText: text("primary_btn_text").notNull(),
  primaryBtnLink: text("primary_btn_link").notNull(),
  secondaryBtnText: text("secondary_btn_text").notNull(),
  secondaryBtnLink: text("secondary_btn_link").notNull(),
  image: text("image"),
});

export const ctaSection = pgTable("cta_section", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  primaryBtnText: text("primary_btn_text").notNull(),
  primaryBtnLink: text("primary_btn_link").notNull(),
  secondaryBtnText: text("secondary_btn_text").notNull(),
  secondaryBtnLink: text("secondary_btn_link").notNull(),
});

export const workAreas = pgTable("work_areas", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  number: text("number").notNull(),
});

export const stories = pgTable("stories", {
  id: text("id").primaryKey(),
  quote: text("quote").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  location: text("location").notNull(),
  approved: boolean("approved").notNull().default(true),
});

export const founderPage = pgTable("founder_page", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  biography: text("biography").array().notNull(),
  image: text("image"),
});

export const volunteerPage = pgTable("volunteer_page", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  formUrl: text("form_url").notNull(),
  formHeight: integer("form_height").notNull().default(2000),
});

export const donatePage = pgTable("donate_page", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  donationOptions: text("donation_options").notNull(), // JSON string of options
  customAmountTitle: text("custom_amount_title").notNull(),
  customAmountDesc: text("custom_amount_desc").notNull(),
  taxNote: text("tax_note").notNull(),
});

export const teamMembers = pgTable("team_members", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  linkedin: text("linkedin"),
  x: text("x"),
  email: text("email"),
});

export const blogs = pgTable("blogs", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  publishedAt: text("published_at").notNull(),
  excerpt: text("excerpt").notNull(),
  category: text("category").notNull(),
  mainImage: text("main_image"),
  authorName: text("author_name"),
  authorRole: text("author_role"),
  authorBio: text("author_bio"),
  authorEmail: text("author_email"),
  body: text("body").notNull(), // JSON string representing array of PortableText blocks (or raw string)
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  keywords: text("keywords").array(),
});
