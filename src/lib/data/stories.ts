import db from "@/db";
import { stories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { usersSync } from "@/db/schema";

export async function getCurrentUsersStories(userId: string) {
  const response = await db
    .select({
      prompt: stories.prompt,
      story: stories.story,
      dateCreated: stories.createdAt,
      authorId: stories.authorId,
      id: stories.id,
      imageSrc: stories.imageSrc,
    })
    .from(stories)
    .where(eq(stories.authorId, userId))
    .leftJoin(usersSync, eq(stories.authorId, usersSync.id));
  return response;
}

export async function getStoryById(id: number) {
  const response = await db
    .select({
      prompt: stories.prompt,
      story: stories.story,
      dateCreated: stories.createdAt,
      authorId: stories.authorId,
      id: stories.id,
      imageSrc: stories.imageSrc,
    })
    .from(stories)
    .where(eq(stories.id, id))
    .leftJoin(usersSync, eq(stories.authorId, usersSync.id));
  return response[0];
}
