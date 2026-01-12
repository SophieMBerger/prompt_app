"use server";

import db from "@/db";
import { stories } from "@/db/schema";

export type CreateStoryInput = {
  prompt: string;
  story: string;
};

export async function createStory(data: CreateStoryInput) {
  const response = await db
    .insert(stories)
    .values({
      prompt: data.prompt,
      story: data.story,
    })
    .returning({ id: stories.id });

  const storyId = response[0]?.id;
  console.log("Story saved to db", storyId);
  return { success: true, message: "Story saved to db", id: storyId };
}
