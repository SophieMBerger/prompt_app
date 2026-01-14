import { getStoryById } from "@/lib/data/stories";
import Image from "next/image";
import AudioPlayer from "./audioPlayer";

interface ViewStoryPageProps {
  params: Promise<{
    id: number;
  }>;
}

export default async function StoryPage({ params }: ViewStoryPageProps) {
  const { id } = await params;
  const story = await getStoryById(id);

  return (
    <div className="max-w-4xl mx-auto mt-10 flex flex-col gap-10 min-h-screen items-center">
      <h1 className="text-2xl mx-auto font-bold">{story.prompt}</h1>

      {story.imageSrc && (
        <Image
          src={story.imageSrc}
          alt="AI Generated Image"
          width="400"
          height="400"
          className="mx-auto"
        />
      )}
      <AudioPlayer text={story.story} />
      <p className="text-xl mx-auto">{story.story}</p>
    </div>
  );
}
