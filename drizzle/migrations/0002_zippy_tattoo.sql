CREATE TABLE IF NOT EXISTS "guest_view" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"ends_at" timestamp,
	"content" jsonb
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "guest_view" ADD CONSTRAINT "guest_view_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
