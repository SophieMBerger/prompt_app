"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { use, useState } from "react";
import generateStoryPrompt from "@/ai/generateStoryPrompt";
import { createStory } from "./actions/storyActions";
import { toast } from "sonner";
import Loading from "./loading";

export default function PromptComponent() {
  const [prompt, setPrompt] = useState("");
  const [loadingPrompt, setLoadingPrompt] = useState(false);
  const [story, setStory] = useState("");
  const [saving, setSaving] = useState(false);

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

  async function saveStory() {
    setSaving(true);
    if (story.length > 0) {
      const payload = {
        prompt: prompt,
        story: story,
      };

      const response = await createStory(payload);

      if (response.success) {
        toast.success("Story successfully saved");
      }

      setStory("");
      setSaving(false);
    } else {
      toast.error("Generate a prompt & write a story first");
    }
  }

  return saving ? (
    <Loading />
  ) : (
    <div className="max-w-2xl mx-auto mt-10 flex flex-col gap-6 min-h-screen items-center justify-center">
      <h1 className="text-3xl mx-auto">Generate Your Story Prompt</h1>

      {loadingPrompt ? (
        <Spinner className="mx-auto size-auto" />
      ) : (
        prompt && <h2 className="text-2xl pt-5">{prompt}</h2>
      )}

      <Textarea
        placeholder="Let your imagination unfold..."
        value={story}
        onChange={(e) => setStory(e.target.value)}
      />

      <div className="flex justify-center gap-4">
        <Button onClick={generateAIPrompt} variant="outline">
          Give me a prompt!
        </Button>
        <Button type="submit" onClick={saveStory}>
          Submit
        </Button>
      </div>
    </div>
  );
}
