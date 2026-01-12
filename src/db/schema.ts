import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  prompt: text("prompt").notNull(),
  story: text("story").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
});

const schema = { stories };
export default schema;

export type Story = typeof stories.$inferSelect;
