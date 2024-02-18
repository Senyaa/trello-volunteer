ALTER TABLE "settings" ADD COLUMN "dog_interaction_enabled" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "settings" ADD COLUMN "cat_interaction_enabled" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "settings" ADD COLUMN "children_interaction_enabled" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "settings" ADD COLUMN "deworming_enabled" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "settings" ADD COLUMN "health_enabled" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "settings" ADD COLUMN "story_enabled" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "settings" ADD COLUMN "info_for_carer_enabled" boolean DEFAULT false NOT NULL;