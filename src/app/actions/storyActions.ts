"use server";

import db from "@/db";
import { stories } from "@/db/schema";
import { ensureUserExists } from "@/db/sync-user";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

export type CreateStoryInput = {
  prompt: string;
  story: string;
};

export async function createStory(data: CreateStoryInput) {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/handler/signin");
  }

  await ensureUserExists(user);

  const response = await db
    .insert(stories)
    .values({
      prompt: data.prompt,
      story: data.story,
      authorId: user.id,
    })
    .returning({ id: stories.id });

  const storyId = response[0]?.id;
  console.log("Story saved to db", storyId);
  return { success: true, message: "Story saved to db", id: storyId };
}
