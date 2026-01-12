"use server";

import { generateImage } from "ai";
import { openai } from "@ai-sdk/openai";

export default async function generateAIImage(prompt: string) {
  const { image } = await generateImage({
    model: openai.image("dall-e-2"),
    prompt: prompt,
  });

  return image.base64;
}
