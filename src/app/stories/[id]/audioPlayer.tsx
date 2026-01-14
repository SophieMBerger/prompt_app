"use client";

import readStory from "@/ai/generateSpeech";
import { Button } from "@/components/ui/button";

export default function AudioPlayer({ text }: { text: string }) {
  async function playAudio() {
    const { base64, mimeType } = await readStory(text);

    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    const blob = new Blob([bytes], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);
    audio.onended = () => URL.revokeObjectURL(url);
    await audio.play();
  }

  return <Button onClick={playAudio}>Read this story to me</Button>;
}
