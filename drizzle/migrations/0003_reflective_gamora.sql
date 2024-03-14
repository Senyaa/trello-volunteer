ALTER TABLE "guest_view" ALTER COLUMN "ends_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "guest_view" ADD COLUMN "type" text DEFAULT 'cats';