"use server";

import db from "@/db";
import { stories } from "@/db/schema";
import { ensureUserExists } from "@/db/sync-user";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import generateAIImage from "@/ai/generateStoryImage";

export type CreateStoryInput = {
  prompt: string;
  story: string;
};

export async function createStory(data: CreateStoryInput) {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/handler/signin");
  }

  console.log("📀 Saving a new story");

  await ensureUserExists(user);
  let src = "";

  try {
    const image = await generateAIImage(data.story);
    src = `data:image/png;base64,${image}`;
  } catch (e) {
    console.error("Unable to generate AI image", e);
  }

  const response = await db
    .insert(stories)
    .values({
      prompt: data.prompt,
      story: data.story,
      authorId: user.id,
      imageSrc: src,
    })
    .returning({ id: stories.id });

  const storyId = response[0]?.id;
  console.log("Story saved to db", storyId);
  return { success: true, message: "Story saved to db", id: storyId };
}
