"use server";

import { experimental_generateSpeech as generateSpeech } from "ai";
import { openai } from "@ai-sdk/openai";

export default async function readStory(storyText: string) {
  const result = await generateSpeech({
    model: openai.speech("tts-1"),
    text: storyText,
  });

  console.log("🎤 AI generateSpeech called");

  const audio = result.audio;

  const base64 = Buffer.from(audio.uint8Array).toString("base64");

  return {
    base64,
    mimeType: audio.mediaType,
  };
}
