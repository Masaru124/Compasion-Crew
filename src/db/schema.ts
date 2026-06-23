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
