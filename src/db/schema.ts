import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  authorId: text("author_id")
    .notNull()
    .references(() => usersSync.id),
  prompt: text("prompt").notNull(),
  story: text("story").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  imageSrc: text("image_src"),
});

const schema = { stories };
export default schema;

export type Story = typeof stories.$inferSelect;

export const usersSync = pgTable("usersSync", {
  id: text("id").primaryKey(), // Stack Auth user ID
  name: text("name"),
  email: text("email"),
});
export type User = typeof usersSync.$inferSelect;
