"use server";

import { generateText } from "ai";

export async function generateStoryPrompt() {
  const { text } = await generateText({
    model: "openai/gpt-5-nano",
    prompt:
      "You are a muse. I am a novice author that wants to write a short story every day. I want you to generate a prompt for a short story for me. Do not include formatting in your response. Do not tell me what exactly to write the story about. Just set the scene. Do not make this story prompt longer than a couple of sentences.",
  });

  return (text ?? "").trim();
}

export default generateStoryPrompt;
