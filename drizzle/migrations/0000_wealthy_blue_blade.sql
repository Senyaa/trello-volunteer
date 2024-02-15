CREATE TABLE IF NOT EXISTS "account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"oauth_token" text,
	"oauth_token_secret" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_provider_account_id_unique" UNIQUE("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "animal_on_shift" (
	"shift_id" uuid,
	"animal_trello_id" text,
	"done" boolean,
	"description" text,
	CONSTRAINT "animal_on_shift_shift_id_animal_trello_id_pk" PRIMARY KEY("shift_id","animal_trello_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "document" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"created_at" timestamp DEFAULT now(),
	"content" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "image_url" (
	"attachment_id" text PRIMARY KEY NOT NULL,
	"url" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"session_token" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "settings" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"food_enabled" boolean DEFAULT true NOT NULL,
	"meds_enabled" boolean DEFAULT false NOT NULL,
	"tests_enabled" boolean DEFAULT false NOT NULL,
	"status_enabled" boolean DEFAULT false NOT NULL,
	"personality_enabled" boolean DEFAULT false NOT NULL,
	"castration_enabled" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shift" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"shift_type" text,
	"finished" timestamp,
	"started" timestamp,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trello_id" text,
	"name" text,
	"full_name" text,
	"email" text DEFAULT '' NOT NULL,
	"email_verified" timestamp,
	"image" text,
	"boards" text[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_on_shift" (
	"user_id" uuid NOT NULL,
	"shift_id" uuid NOT NULL,
	CONSTRAINT "users_on_shift_user_id_shift_id_pk" PRIMARY KEY("user_id","shift_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification_token" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_on_shift" ADD CONSTRAINT "users_on_shift_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_on_shift" ADD CONSTRAINT "users_on_shift_shift_id_shift_id_fk" FOREIGN KEY ("shift_id") REFERENCES "shift"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
