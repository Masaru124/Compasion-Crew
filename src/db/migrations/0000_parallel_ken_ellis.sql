CREATE TABLE "events" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"date" text NOT NULL,
	"time" text NOT NULL,
	"location" text NOT NULL,
	"category" text NOT NULL,
	"spots" integer DEFAULT 0 NOT NULL,
	"image" text,
	"is_past" boolean DEFAULT false NOT NULL,
	"registration_open" boolean DEFAULT true NOT NULL,
	"details" text,
	"gallery" text[]
);
