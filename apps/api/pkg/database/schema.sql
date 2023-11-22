CREATE TYPE "status" AS ENUM('waiting', 'invited');

CREATE TABLE IF NOT EXISTS "email_templates" (
	"template_id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
	"waitlist_id" varchar(256),
	"user_id" varchar(50) NOT NULL,
	"email" varchar(255) NOT NULL,
	"section_color" varchar(50) NOT NULL,
	"body_text" text NOT NULL
);
CREATE TABLE IF NOT EXISTS "signups" (
	"signup_id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
	"waitlist_id" varchar(256) NOT NULL,
	"email" varchar(255) NOT NULL,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"status" "status" DEFAULT 'waiting' NOT NULL
);
CREATE TABLE IF NOT EXISTS "waitlists" (
	"waitlist_id" varchar(256) PRIMARY KEY NOT NULL,
	"user_id" varchar(50) NOT NULL,
	"waitlist_name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);