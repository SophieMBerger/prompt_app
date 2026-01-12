"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import generateStoryPrompt from "@/ai/generateStoryPrompt";

export default function PromptComponent() {
  const [prompt, setPrompt] = useState("");
  const [loadingPrompt, setLoadingPrompt] = useState(false);

  async function generateAIPrompt() {
    console.log("🤖 generateAIPrompt called");

    setLoadingPrompt(true);

    try {
      const aiPrompt = await generateStoryPrompt();
      setPrompt(aiPrompt);
    } catch (err) {
      console.error("❌Failed to generate prompt", err);
      setPrompt(
        "We are currently experiencing difficulties. Sorry about that.",
      );
    } finally {
      setLoadingPrompt(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 flex flex-col gap-6">
      <h1 className="text-3xl mx-auto">Generate Your Story Prompt</h1>
      {loadingPrompt ? (
        <Spinner className="mx-auto size-auto" />
      ) : (
        <h2 className="text-2xl pt-10">"{prompt}"</h2>
      )}
      <Textarea placeholder="Let your imagination unfold..." />
      <Button
        onClick={generateAIPrompt}
        variant="outline"
        className="w-xs mx-auto"
      >
        Give me a prompt!
      </Button>
    </div>
  );
}
