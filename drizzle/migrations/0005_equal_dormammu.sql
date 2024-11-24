CREATE TABLE IF NOT EXISTS "link" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" text NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
