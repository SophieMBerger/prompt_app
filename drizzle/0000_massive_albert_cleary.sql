CREATE TABLE "stories" (
	"id" serial PRIMARY KEY NOT NULL,
	"prompt" text NOT NULL,
	"story" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
