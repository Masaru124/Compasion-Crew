CREATE TABLE "blogs" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"published_at" text NOT NULL,
	"excerpt" text NOT NULL,
	"category" text NOT NULL,
	"main_image" text,
	"author_name" text,
	"author_role" text,
	"author_bio" text,
	"author_email" text,
	"body" text NOT NULL,
	"seo_title" text,
	"seo_description" text,
	"keywords" text[],
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "cta_section" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"primary_btn_text" text NOT NULL,
	"primary_btn_link" text NOT NULL,
	"secondary_btn_text" text NOT NULL,
	"secondary_btn_link" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "donate_page" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"donation_options" text NOT NULL,
	"custom_amount_title" text NOT NULL,
	"custom_amount_desc" text NOT NULL,
	"tax_note" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "founder_page" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"biography" text[] NOT NULL,
	"image" text
);
--> statement-breakpoint
CREATE TABLE "hero_section" (
	"id" text PRIMARY KEY NOT NULL,
	"eyebrow" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"primary_btn_text" text NOT NULL,
	"primary_btn_link" text NOT NULL,
	"secondary_btn_text" text NOT NULL,
	"secondary_btn_link" text NOT NULL,
	"image" text
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"address" text NOT NULL,
	"footer_description" text NOT NULL,
	"copyright_text" text
);
--> statement-breakpoint
CREATE TABLE "stories" (
	"id" text PRIMARY KEY NOT NULL,
	"quote" text NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"location" text NOT NULL,
	"approved" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"bio" text NOT NULL,
	"linkedin" text,
	"x" text,
	"email" text
);
--> statement-breakpoint
CREATE TABLE "volunteer_page" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"form_url" text NOT NULL,
	"form_height" integer DEFAULT 2000 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "work_areas" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image" text,
	"number" text NOT NULL
);
