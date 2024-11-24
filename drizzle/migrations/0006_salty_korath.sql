ALTER TABLE "user" ADD COLUMN "userType" text DEFAULT 'USER';--> statement-breakpoint
ALTER TABLE "link" ADD CONSTRAINT "link_label_unique" UNIQUE("label");