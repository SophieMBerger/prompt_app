"use client";

import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";

type StoryCardProps = {
  prompt: string;
  storyText: string;
  dateCreated?: string;
  id: number;
  imageSrc: string;
};

export default function StoryCard({
  prompt,
  storyText,
  dateCreated,
  id,
  imageSrc,
}: StoryCardProps) {
  const router = useRouter();

  return (
    <Card
      className="w-full max-w-l flex"
      onClick={() => router.push(`/stories/${id}`)}
    >
      <CardHeader className="">
        <CardTitle>{`${prompt.substring(0, 50)}...`}</CardTitle>
        <CardDescription>{dateCreated}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-row items-start justify-between gap-4">
        <p>{`${storyText.substring(0, 100)}...`}</p>
        {imageSrc && (
          <Image
            src={imageSrc}
            alt="AI Generated Image"
            height="100"
            width="100"
            className="mx-auto flex-1"
          />
        )}
      </CardContent>
    </Card>
  );
}
